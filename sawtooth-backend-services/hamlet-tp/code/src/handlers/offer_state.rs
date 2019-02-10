use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;
use crate::std_ext::handle;

/**
* Offers are the method of exchange for Assets being held in Holdings.  An Offer uses an Account's
* source Holding and target Holding.  Another Account may put the specified amount of a requested Asset in the
* Offer creator's target Holding, in order to receive the specified amount of another Asset from the Offer creator's
* source Holding.
*/
pub trait Offer {
    /**
    * Creates an Offer
    * Invalid if:
    * - There is already an Offer with the same id.
    * - The txn signer does not have an Account.
    * - Either the source or target Holding account is not the signer.
    * - The source is unset.
    * - The source_quantity is unset or 0.
    * - The target or target_quantity are set while the other is unset.
    * - The source is not a holding.
    * - THe target is not a holding.
    */
    fn create(
        &self,
        payload: payload::CreateOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

    /**
    * Accepts an Offer
    * Moving much of the below validation to smart contracts via Sabre
    * Invalid if:
    * - The Offer does not exist or is not Open
    * - The receiver source Holding does not exist.
    * - The receiver target Holding does not exist.
    * - The offerer source holding asset does not match the
      receiver target holding asset.
    * - The offerer target holding asset does not match the
      the receiver source holding asset.
    * - The receiver source holding does not have the required quantity.
    * - The offerer source holding does not have the required quantity.
    */
    fn accept(
        &self,
        payload: payload::AcceptOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

    /**
    * Closes an Offer
    */
    fn close(
        &self,
        payload: payload::CloseOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

    fn _decrease_holding();
    fn _increase_holding();
}

impl Offer for &hamlet_handler::HamletTransactionHandler {
    fn create(
        &self,
        payload: payload::CreateOffer,
        mut state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError> {
        match state.get_account(signer) {
            Ok(Some(_)) => (),
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Account is not registered: {}",
                    signer
                )))
            }
            Err(err) => return Err(err),
        }

        let offer_id = payload.get_id();
        let offer_label = payload.get_label();
        let offer_description = payload.get_description();
        let offer_source = payload.get_source();
        let offer_source_quantity = payload.get_source_quantity();
        let offer_target = payload.get_target();
        let offer_target_quantity = payload.get_target_quantity();
        let offer_rules = payload.get_rules().to_vec();


        match state.get_offer(offer_id) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offer with this id already exists: {}",
                    offer_id
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }

        let source_holding = match state.get_holding(offer_source) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Holding does not exist {}",
                    offer_source
                )))
            }
            Err(err) => return Err(err),
        };

        let source_holding_account = source_holding.get_account();
        let source_holding_asset = source_holding.get_asset();

        if source_holding_account != signer.to_string() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Source account {} is not owned by the signer {}",
                source_holding_account,
                signer
            )))
        }

        let source_asset = match state.get_asset(source_holding_asset) {
            Ok(Some(asset)) => asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist {}",
                    source_holding_asset
                )))
            }
            Err(err) => return Err(err),
        };

        if handle::_is_not_transferable(source_asset, &signer) {
            return Err(ApplyError::InvalidTransaction(format!(
                "Asset is not transferable {}",
                source_holding_asset
            )))
        }

        let target_holding = match state.get_holding(offer_target) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Holding does not exist {}",
                    offer_target
                )))
            }
            Err(err) => return Err(err),
        };
        let target_holding_account = target_holding.get_account();
        let target_holding_asset = target_holding.get_asset();

        let target_asset = match state.get_asset(target_holding_asset) {
            Ok(Some(asset)) => asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist {}",
                    source_holding.get_asset()
                )))
            }
            Err(err) => return Err(err),
        };


        if handle::_is_not_transferable(target_asset, &signer) {
            return Err(ApplyError::InvalidTransaction(format!(
                "Asset is not transferable {}",
                target_holding_asset
            )))
        }

        // All checks have passed
        let mut new_offer = offer::Offer::new();
        new_offer.set_id(offer_id.to_string());
        new_offer.set_label(offer_label.to_string());
        new_offer.set_description(offer_description.to_string());
        new_offer.set_source(offer_source.to_string());
        new_offer.set_source_quantity(offer_source_quantity);
        new_offer.set_target(offer_target.to_string());
        new_offer.set_target_quantity(offer_target_quantity);
        new_offer.set_owners(RepeatedField::from_vec(vec![signer.to_string()]));
        new_offer.set_rules(RepeatedField::from_vec(offer_rules));
        new_offer.set_status(offer::Offer_Status::OPEN);


        state.set_offer(offer_id, new_offer)?;
        Ok(())
    }

    fn accept(
        &self,
        payload: payload::AcceptOffer,
        mut state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError> {
        let offer_id = payload.get_id();
        let accept_offer_source = payload.get_source();
        let accept_offer_target = payload.get_target();
        let accept_offer_count = payload.get_count();

        // Check that the offer exists and is open
        let offer: offer::Offer = match state.get_offer(offer_id) {
            Ok(Some(offer)) => match offer.get_status() {
                offer::Offer_Status::OPEN => offer,
                _ => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Offer exists, but is not open {}",
                        offer_id
                    )))
                }
            },
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offer does not exist {}",
                    offer_id
                )))
            }
            Err(err) => return Err(err),
        };
        let offeror_source = offer.get_source();
        let offeror_target = offer.get_target();

        // Make sure the holdings exist
        let offeror_source_holding: holding::Holding = match state.get_holding(offeror_source) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offeror source Holding does not exist {}",
                    offeror_source
                )))
            }
            Err(err) => return Err(err),
        };
        let offeror_source_holding_account = offeror_source_holding.get_account();
        let offeror_source_holding_asset = offeror_source_holding.get_asset();

        let offeror_target_holding = match state.get_holding(offeror_target) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offeror target Holding does not exist {}",
                    offeror_target
                )))
            }
            Err(err) => return Err(err),
        };
        let offeror_target_holding_account = offeror_target_holding.get_account();
        let offeror_target_holding_asset = offeror_target_holding.get_asset();

        // Get the receiving Accounts Holding and Asset info
        let receiver_source_holding = match state.get_holding(accept_offer_source) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Accepted source Holding does not exist {}",
                    accept_offer_source
                )))
            }
            Err(err) => return Err(err),
        };
        let receiver_source_holding_account = receiver_source_holding.get_account();
        let receiver_source_holding_asset = receiver_source_holding.get_asset();

        let receiver_target_holding = match state.get_holding(accept_offer_target) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Accepted target Holding does not exist {}",
                    accept_offer_target
                )))
            }
            Err(err) => return Err(err),
        };
        let receiver_target_holding_account = receiver_target_holding.get_account();
        let receiver_target_holding_asset = receiver_target_holding.get_asset();

        // Make sure that the assets are the same
        // TODO: combine validation
        if offeror_source_holding_account != receiver_target_holding_asset {
            return Err(ApplyError::InvalidTransaction(format!(
                "The offeror's is sending Asset {} and receiver's Holding holds Asset {}",
                offeror_source_holding_account,
                receiver_target_holding_asset
            )))
        }
        if offeror_target_holding_account != receiver_source_holding_asset {
            return Err(ApplyError::InvalidTransaction(format!(
                "The offeror's Holding holds Asset {} the receiver is sending Asset {}",
                offeror_target_holding_account,
                receiver_source_holding_asset
            )))
        }

        /* Make sure the assets exist
        match state.get_asset(source_holding_asset) {
            Ok(Some(_)) => match state.get_asset(target_holding_asset) {
                Ok(Some(_)) => (),
                Ok(None) => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Offer exists, but is not open {}",
                        offer_id
                    )))
                }
            },
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offer with this id already exists: {}",
                    offer_id
                )))
            },
            Err(err) => return Err(err),
        }
        */
        // Add State functions to modify holding quantity

        // ! TODO: Do rule validation
        Ok(())

    }

    fn close(
        &self,
        payload: payload::CloseOffer,
        mut state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError> {
        let offer_id = payload.get_id();

        match state.get_offer(offer_id) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Offer with this id already exists: {}",
                    offer_id
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }
        Ok(())
    }

    fn _decrease_holding() {

    }
    fn _increase_holding() {

    }
}
