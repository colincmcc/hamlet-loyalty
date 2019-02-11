use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;

pub trait Holding {

    fn create(
        &self,
        payload: payload::CreateHolding,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

}

impl Holding for &hamlet_handler::HamletTransactionHandler {

    fn create(
        &self,
        payload: payload::CreateHolding,
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

        let holding_id = payload.get_id();
        let holding_label = payload.get_label();
        let holding_description = payload.get_description();
        let holding_asset = payload.get_asset();
        let holding_quantity = payload.get_quantity();


        match state.get_holding(holding_id) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Holding with this id already exists: {}",
                    holding_id
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }

        // Check if the asset exists
        let asset = match state.get_asset(holding_asset) {
            Ok(Some(asset)) => asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist {}",
                    holding_asset
                )))
            }
            Err(err) => return Err(err),
        };
        // The signer must be an owner of the asset
        match asset.get_owners().contains(&signer.to_string()) && holding_quantity > 0 {
            true => (),
            false => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Account {} is not authorized to create a holding greater than 0 with this asset: {}",
                    signer,
                    asset.get_name()
                )))
            }
        }

        let mut new_holding = holding::Holding::new();
        new_holding.set_id(holding_id.to_string());
        new_holding.set_label(holding_label.to_string());
        new_holding.set_description(holding_description.to_string());
        new_holding.set_account(signer.to_string());
        new_holding.set_asset(holding_asset.to_string());
        new_holding.set_quantity(holding_quantity);

        state.set_holding(holding_id, new_holding)?;
        Ok(())
    }



}