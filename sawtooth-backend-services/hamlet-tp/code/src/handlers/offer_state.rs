use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;
use crate::std_ext::handle;

pub trait Offer {
    fn create(
        &self,
        payload: payload::CreateOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

    fn accept(
        &self,
        payload: payload::AcceptOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

    fn close(
        &self,
        payload: payload::CloseOffer,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;
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

        if source_holding.account != signer.to_string() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Holding account is not owned by the signer {}",
                signer
            )))
        }

        let source_asset = match state.get_asset(source_holding.get_asset()) {
            Ok(Some(asset)) => asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist {}",
                    source_holding.get_asset()
                )))
            }
            Err(err) => return Err(err),
        };

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

        let target_asset = match state.get_asset(target_holding.get_asset()) {
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
                source_holding.get_asset()
            )))
        }

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
}