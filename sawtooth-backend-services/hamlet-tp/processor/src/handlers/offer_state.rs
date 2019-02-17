use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;
use crate::std_ext::handle;
use crate::handlers::holding_state::Holding;

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
    * - The offeror source holding asset does not match the
      receiver target holding asset.
    * - The offeror target holding asset does not match the
      the receiver source holding asset.
    * - The receiver source holding does not have the required quantity.
    * - The offeror source holding does not have the required quantity.
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

        let offer_id = payload.get_offer_id();
        let offer_label = payload.get_label();
        let offer_description = payload.get_description();
        let offer_source = payload.get_source();
        let offer_source_quantity = payload.get_source_quantity();
        let offer_target = payload.get_target();
        let offer_target_quantity = payload.get_target_quantity();
        let offer_rules = payload.get_rules().to_vec();
        info!(
            "Offer: source_qty {:?}  target_qty{}",
            &offer_source_quantity,
            &offer_target_quantity
        );

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
                    "Source Holding does not exist {}",
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
                    "Source Asset does not exist {}",
                    source_holding_asset
                )))
            }
            Err(err) => return Err(err),
        };

        if handle::_is_not_transferable(source_asset, &signer) {
            return Err(ApplyError::InvalidTransaction(format!(
                "Source Asset is not transferable {}",
                source_holding_asset
            )))
        }

        let target_holding = match state.get_holding(offer_target) {
            Ok(Some(holding)) => holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Target Holding does not exist {}",
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
                    "Target Asset does not exist {}",
                    source_holding.get_asset()
                )))
            }
            Err(err) => return Err(err),
        };


        if handle::_is_not_transferable(target_asset, &signer) {
            return Err(ApplyError::InvalidTransaction(format!(
                "Target Asset is not transferable {}",
                target_holding_asset
            )))
        }

        // All checks have passed
        let mut new_offer = offer::Offer::new();
        new_offer.set_offer_id(offer_id.to_string());
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
        let offer_id = payload.get_offer_id();
        let accept_offer_source = payload.get_source();
        let accept_offer_target = payload.get_target();
        let accept_offer_count = payload.get_count() as i64;

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
        let offeror_source_qty = offer.get_source_quantity();
        let offeror_target_qty = offer.get_target_quantity();

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
        let offeror_source_holding_id = offeror_source_holding.get_holding_id();
        let offeror_source_holding_asset = offeror_source_holding.get_asset();
        let offeror_source_holding_qty = offeror_source_holding.get_quantity();
        let offeror_public_key = offeror_source_holding.get_account();

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
        let offeror_target_holding_id = offeror_target_holding.get_holding_id();
        let offeror_target_holding_asset = offeror_target_holding.get_asset();
        let offeror_target_holding_qty = offeror_target_holding.get_quantity();

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
        let receiver_source_holding_id = receiver_source_holding.get_holding_id();
        let receiver_source_holding_asset = receiver_source_holding.get_asset();
        let receiver_source_holding_qty = receiver_source_holding.get_quantity();

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
        let receiver_target_holding_id = receiver_target_holding.get_holding_id();
        let receiver_target_holding_asset = receiver_target_holding.get_asset();
        let receiver_target_holding_qty = receiver_target_holding.get_quantity();

        // Make sure that the assets are the same
        // TODO: combine validation
        if offeror_source_holding_asset != receiver_target_holding_asset {
            return Err(ApplyError::InvalidTransaction(format!(
                "The offeror's is sending Asset {} and receiver's Holding holds Asset {}",
                offeror_source_holding_asset,
                receiver_target_holding_asset
            )))
        }
        if offeror_target_holding_asset != receiver_source_holding_asset {
            return Err(ApplyError::InvalidTransaction(format!(
                "The offeror's Holding holds Asset {} the receiver is sending Asset {}",
                offeror_target_holding_asset,
                receiver_source_holding_asset
            )))
        }

        // Rule Validation
        let mut exchange_once: bool = false;
        let mut exchange_once_per_account: bool = false;

        if handle::_exchange_once(offer.clone()) {
            match state.offer_has_receipt(offer_id) {
                Ok(true) => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Failed to accept offer, EXCHANGE ONCE set \
                         and this offer has already been accepted"
                    )))
                }
                Ok(false) => {
                    exchange_once = true;
                    ()
                },
                Err(err) => return Err(err),
            }
        }

        if handle::_exchange_once_per_account(offer.clone()) {
            match state.get_offer_account_receipt(offer_id, signer) {
                Ok(Some(_)) => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Failed to accept offer, EXCHANGE ONCE PER ACCOUNT set \
                         and account {} already has accepted the offer",
                        signer
                    )))
                }
                Ok(None) => {
                    exchange_once_per_account = true;
                    ()
                },
                Err(err) => return Err(err),
            }
        }

        let receiver_source_asset = match state.get_asset(receiver_source_holding_asset) {
            Ok(Some(receiver_source_asset)) => receiver_source_asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist: {}",
                    receiver_source_holding_asset
                )))
            },
            Err(err) => return Err(err),
        };

        let offeror_source_asset = match state.get_asset(offeror_source_holding_asset) {
            Ok(Some(offeror_source_asset)) => offeror_source_asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist: {}",
                    offeror_source_holding_asset
                )))
            },
            Err(err) => return Err(err),
        };

        // ! TODO: Do rule validation

        let new_rec_source_holding_qty = receiver_source_holding_qty - offeror_target_qty * accept_offer_count;
        let new_rec_target_holding_qty = receiver_target_holding_qty + offeror_source_qty * accept_offer_count;
        let new_off_source_holding_qty = offeror_source_holding_qty - offeror_source_qty * accept_offer_count;
        let new_off_target_holding_qty = offeror_target_holding_qty + offeror_target_qty * accept_offer_count;

        // Make sure there is enough in the accounts or the asset is infinite
        match new_rec_source_holding_qty < 0 {
            true => match handle::_holding_is_infinite(receiver_source_asset, signer){
                false => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Failed to accept offer, the accepting Account {} does not have enough {}",
                        signer,
                        receiver_source_holding_asset
                    )))
                },
                true => ()

            },
            false => ()
        }

        // Make sure there is enough in the accounts or the asset is infinite
        match new_off_source_holding_qty < 0 {
            true => match handle::_holding_is_infinite(offeror_source_asset, offeror_public_key){
                false => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Failed to accept offer, the offering Account {} does not have enough of {}",
                        offeror_public_key,
                        offeror_source_holding_asset
                    )))
                },
                true => ()

            },
            false => ()
        }
        // TODO: when available - async or coroutine
        state.update_holding(receiver_source_holding_id, new_rec_source_holding_qty);
        state.update_holding(receiver_target_holding_id, new_rec_target_holding_qty);
        state.update_holding(offeror_source_holding_id, new_off_source_holding_qty);
        state.update_holding(offeror_target_holding_id, new_off_target_holding_qty);

        if(exchange_once){
            state.save_offer_receipt(offer_id);
        }
        if(exchange_once_per_account){
            state.save_offer_account_receipt(offer_id, signer);
        }
        Ok(())
    }

    fn close(
        &self,
        payload: payload::CloseOffer,
        mut state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError> {
        let offer_id = payload.get_offer_id();

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
