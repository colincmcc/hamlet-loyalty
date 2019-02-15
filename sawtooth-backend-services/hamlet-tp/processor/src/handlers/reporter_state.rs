use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;


pub trait Reporter {


    fn revoke(
        &self,
        payload: payload::RevokeReporter,
        state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError>;

}

impl Reporter for &hamlet_handler::HamletTransactionHandler {

    fn revoke(
        &self,
        payload: payload::RevokeReporter,
        mut state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError> {
        let record_id = payload.get_record_id();
        let reporter_id = payload.get_reporter_id();
        let properties = payload.get_properties();

        let revoke_record = match state.get_record(record_id) {
            Ok(Some(record)) => record,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record does not exists: {}",
                    record_id
                )))
            }
            Err(err) => return Err(err),
        };

        let owner = match revoke_record.owners.last() {
            Some(x) => x,
            None => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Owner was not found",
                )))
            }
        };

        if owner.get_account_id() != signer {
            return Err(ApplyError::InvalidTransaction(format!(
                "Must be owner to revoke reporters"
            )));
        }

        if revoke_record.get_field_final() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Record is final: {}",
                record_id
            )));
        }

        for prop_name in properties {
            let mut prop = match state.get_property(record_id, prop_name) {
                Ok(Some(prop)) => prop,
                Ok(None) => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Property does not exists"
                    )))
                }
                Err(err) => return Err(err),
            };

            let mut new_reporters: Vec<property::Property_Reporter> = Vec::new();
            let mut revoked = false;
            for reporter in prop.get_reporters() {
                if reporter.get_public_key() == reporter_id {
                    if !reporter.get_authorized() {
                        return Err(ApplyError::InvalidTransaction(format!(
                            "Reporter is already unauthorized."
                        )));
                    }
                    let mut unauthorized_reporter = reporter.clone();
                    unauthorized_reporter.set_authorized(false);
                    revoked = true;
                    new_reporters.push(unauthorized_reporter);
                } else {
                    new_reporters.push(reporter.clone());
                }
            }
            if !revoked {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Reporter cannot be revoked: {}",
                    reporter_id
                )));
            }
            prop.set_reporters(RepeatedField::from_vec(new_reporters));

            state.set_property(record_id, prop_name, prop)?;
        }

        Ok(())
    }

}