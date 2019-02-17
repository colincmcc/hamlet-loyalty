use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;

pub trait Account {
    fn create(
        &self,
        payload: payload::CreateAccount,
        state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError>;

}

impl Account for &hamlet_handler::HamletTransactionHandler {

    fn create(
        &self,
        payload: payload::CreateAccount,
        mut state: HamletState,
        signer: &str
    ) -> Result<(), ApplyError> {
        let label = payload.get_label();
        let description = payload.get_description();
        match state.get_account(signer) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Account already exists with label {}",
                    label
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }

        let mut new_account = account::Account::new();
        new_account.set_public_key(signer.to_string());
        new_account.set_label(label.to_string());
        new_account.set_description(description.to_string());
        new_account.set_holdings(RepeatedField::from_vec(vec![]));

        state.set_account(signer, new_account)?;
        Ok(())
    }

}