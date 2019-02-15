use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use std::collections::HashMap;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;

pub trait RecordType {

    fn create(
        &self,
        payload: payload::CreateRecordType,
        state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError>;
}

impl RecordType for &hamlet_handler::HamletTransactionHandler {

    fn create(
        &self,
        payload: payload::CreateRecordType,
        mut state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError> {
        match state.get_account(signer) {
            Ok(Some(_)) => (),
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Account is not register: {}",
                    signer
                )))
            }
            Err(err) => return Err(err),
        }
        let name = payload.get_name();
        let mut provided_properties: HashMap<&str, property::PropertySchema> = HashMap::new();
        for property in payload.get_properties() {
            provided_properties.insert(property.get_name(), property.clone());
        }
        match state.get_record_type(name) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record type already exists: {}",
                    signer
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }
        let mut record_type = record::RecordType::new();
        record_type.set_name(name.to_string());
        record_type.set_properties(RepeatedField::from_vec(payload.get_properties().to_vec()));

        state.set_record_type(name, record_type)?;

        Ok(())
    }
}