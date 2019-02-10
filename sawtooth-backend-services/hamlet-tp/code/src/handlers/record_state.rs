use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use std::collections::HashMap;
use crate::protos::*;
use crate::hamlet_handler;
use crate::std_ext::handle;
pub trait Record{

    fn create(
        &self,
        payload: payload::CreateRecord,
        state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError>;

    fn finalize(
        &self,
        payload: payload::FinalizeRecord,
        state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError>;
}

impl Record for &hamlet_handler::HamletTransactionHandler {

    fn create(
        &self,
        payload: payload::CreateRecord,
        mut state: HamletState,
        signer: &str,
        timestamp: u64,
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
        let record_id = payload.get_record_id();
        match state.get_record(record_id) {
            Ok(Some(_)) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record already exists: {}",
                    record_id
                )))
            }
            Ok(None) => (),
            Err(err) => return Err(err),
        }

        let type_name = payload.get_record_type();
        let record_type = match state.get_record_type(type_name) {
            Ok(Some(record_type)) => record_type,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record Type does not exist {}",
                    type_name
                )))
            }
            Err(err) => return Err(err),
        };

        let mut type_schemata: HashMap<&str, property::PropertySchema> = HashMap::new();
        let mut required_properties: HashMap<&str, property::PropertySchema> = HashMap::new();
        let mut provided_properties: HashMap<&str, property::PropertyValue> = HashMap::new();
        for property in record_type.get_properties() {
            type_schemata.insert(property.get_name(), property.clone());
            if property.get_required() {
                required_properties.insert(property.get_name(), property.clone());
            }
        }

        for property in payload.get_properties() {
            provided_properties.insert(property.get_name(), property.clone());
        }

        for name in required_properties.keys() {
            if !provided_properties.contains_key(name) {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Required property {} not provided",
                    name
                )));
            }
        }

        for (provided_name, provided_properties) in provided_properties.clone() {
            let required_type = match type_schemata.get(provided_name) {
                Some(required_type) => required_type.data_type,
                None => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Provided property {} is not in schemata",
                        provided_name
                    )))
                }
            };
            let provided_type = provided_properties.data_type;
            if provided_type != required_type {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Value provided for {} is the wrong type",
                    provided_name
                )));
            };

            let is_delayed = match type_schemata.get(provided_name) {
                Some(property_schema) => property_schema.delayed,
                None => false,
            };
            if is_delayed {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Property is 'delayed', and cannot be set at record creation: {}",
                    provided_name
                )));
            };
        }
        let mut new_record = record::Record::new();
        new_record.set_record_id(record_id.to_string());
        new_record.set_record_type(type_name.to_string());
        new_record.set_field_final(false);

        let mut owner = record::Record_AssociatedAccount::new();
        owner.set_account_id(signer.to_string());
        owner.set_timestamp(timestamp);
        new_record.owners.push(owner.clone());
        new_record.custodians.push(owner.clone());

        state.set_record(record_id, new_record)?;

        let mut reporter = property::Property_Reporter::new();
        reporter.set_public_key(signer.to_string());
        reporter.set_authorized(true);
        reporter.set_index(0);

        for (property_name, property) in type_schemata {
            let mut new_property = property::Property::new();
            new_property.set_name(property_name.to_string());
            new_property.set_record_id(record_id.to_string());
            new_property.set_data_type(property.get_data_type());
            new_property.reporters.push(reporter.clone());
            new_property.set_current_page(1);
            new_property.set_wrapped(false);
            new_property.set_fixed(property.get_fixed());
            new_property.set_number_exponent(property.get_number_exponent());
            new_property.set_enum_options(
                RepeatedField::from_vec(property.get_enum_options().to_vec()));
            new_property.set_struct_properties(
                RepeatedField::from_vec(property.get_struct_properties().to_vec()));
            new_property.set_unit(property.get_unit().to_string());

            state.set_property(record_id, property_name, new_property.clone())?;

            let mut new_property_page = property::PropertyPage::new();
            new_property_page.set_name(property_name.to_string());
            new_property_page.set_record_id(record_id.to_string());

            if provided_properties.contains_key(property_name) {
                let provided_property = &provided_properties[property_name];
                let reported_value = match handle::_make_new_reported_value(
                    0,
                    timestamp,
                    provided_property,
                    &new_property,
                ) {
                    Ok(reported_value) => reported_value,
                    Err(err) => return Err(err),
                };

                new_property_page.reported_values.push(reported_value);
            }
            state.set_property_page(record_id, property_name, 1, new_property_page)?;
        }

        Ok(())
    }

    fn finalize(
        &self,
        payload: payload::FinalizeRecord,
        mut state: HamletState,
        signer: &str,
    ) -> Result<(), ApplyError> {
        let record_id = payload.get_record_id();
        let final_record = match state.get_record(record_id) {
            Ok(Some(final_record)) => final_record,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record does not exist: {}",
                    record_id
                )))
            }
            Err(err) => return Err(err),
        };
        let owner = match final_record.owners.last() {
            Some(x) => x,
            None => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Owner was not found",
                )))
            }
        };
        let custodian = match final_record.custodians.last() {
            Some(x) => x,
            None => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Custodian was not found",
                )))
            }
        };

        if owner.account_id != signer || custodian.account_id != signer {
            return Err(ApplyError::InvalidTransaction(format!(
                "Must be owner and custodian to finalize record"
            )));
        }
        if final_record.get_field_final() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Record is already final: {}",
                record_id
            )));
        }

        let mut record_clone = final_record.clone();
        record_clone.set_field_final(true);
        state.set_record(record_id, record_clone)?;

        Ok(())
    }
}