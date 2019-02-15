
use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;

pub trait Asset {
    fn create(
        &self,
        payload: payload::CreateAsset,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;
    fn update(
        &self,
        payload: payload::UpdateAsset,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;
}

impl Asset for &hamlet_handler::HamletTransactionHandler {
    fn create(
        &self,
        payload: payload::CreateAsset,
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

        let asset_name = payload.get_name();
        let asset_description = payload.get_description();
        let asset_rules = payload.get_rules().to_vec();

        match state.get_asset(asset_name) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset with this name already exists: {}",
                    asset_name
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }


        let mut new_asset = asset::Asset::new();
        new_asset.set_description(asset_description.to_string());
        new_asset.set_name(asset_name.to_string());
        new_asset.set_owners(RepeatedField::from_vec(vec![signer.to_string()]));
        new_asset.set_rules(RepeatedField::from_vec(asset_rules));

        state.set_asset(asset_name, new_asset)?;
        Ok(())
    }

    fn update(
        &self,
        payload: payload::UpdateAsset,
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

        let asset_name = payload.get_name();

        let updated_asset = match state.get_asset(asset_name) {
            Ok(Some(updated_asset)) => updated_asset,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Asset does not exist: {}",
                    asset_name
                )))
            }
            Err(err) => return Err(err),
        };

        match updated_asset.get_owners().contains(&signer.to_string()) {
            true => (),
            false => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Account is not registered: {}",
                    signer
                )))
            }
        }
        let asset_description = payload.get_description();
        let asset_rules = payload.get_rules().to_vec();
        let asset_owners = payload.get_owners().to_vec();

        let mut asset_clone = updated_asset;

        asset_clone.set_description(asset_description.to_string());
        asset_clone.set_name(asset_name.to_string());
        asset_clone.set_owners(RepeatedField::from_vec(asset_owners));
        asset_clone.set_rules(RepeatedField::from_vec(asset_rules));

        state.set_asset(asset_name, asset_clone)?;
        Ok(())
    }
}