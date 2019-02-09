use sawtooth_sdk::messages::processor::TpProcessRequest;
use sawtooth_sdk::processor::handler::{ApplyError, TransactionContext, TransactionHandler};
use protobuf::{Message, RepeatedField};
use protobuf;
use std::collections::HashMap;
use std::str;

use crate::protos::*;


use crate::handlers::hamlet_state::HamletState;
use crate::handlers::hamlet_payload::{HamletPayload, Action};
use crate::handlers::hamlet_handler;
use crate::addressing::get_hamlet_prefix;


const PROPERTY_PAGE_MAX_LENGTH: usize = 256;

pub struct HamletTransactionHandler {
    family_name: String,
    family_versions: Vec<String>,
    namespaces: Vec<String>,
}

impl HamletTransactionHandler {
    pub fn new() -> HamletTransactionHandler {
        HamletTransactionHandler {
            family_name: "hamlet_loyalty".into(),
            family_versions: vec!["1.0".into()],
            namespaces: vec![get_hamlet_prefix()],
        }
    }
    fn _create_account(
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

    fn _create_asset(
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
        /*
        for (rule) in asset_rules {
            info!(
                "Rule: {:?} {}",
                rule.get_value().to_string(),
                rule.get_field_type().to_string()
            );
            let mut new_rule = rule::Rule::new();
            new_rule.value = rule.get_value();
            new_rule.field_type = rule.get_field_type();
            new_asset.rules.push(new_rule.clone());
        } */
        state.set_asset(asset_name, new_asset)?;
        Ok(())
    }

    fn _update_asset(
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
    fn _create_record(
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
                let reported_value = match self._make_new_reported_value(
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

    fn _finalize_record(
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

    fn _create_record_type(
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


    fn _update_properties(
        &self,
        payload: payload::UpdateProperties,
        mut state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError> {
        let record_id = payload.get_record_id();
        let update_record = match state.get_record(record_id) {
            Ok(Some(update_record)) => update_record,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record does not exist: {}",
                    record_id
                )))
            }
            Err(err) => return Err(err),
        };

        if update_record.get_field_final() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Record is final: {}",
                record_id
            )));
        }

        let updates = payload.get_properties();

        for update in updates {
            let name = update.get_name();
            let data_type = update.get_data_type();

            let mut prop = match state.get_property(record_id, name) {
                Ok(Some(prop)) => prop,
                Ok(None) => {
                    return Err(ApplyError::InvalidTransaction(format!(
                        "Record does not have provided poperty: {}",
                        name
                    )))
                }
                Err(err) => return Err(err),
            };

            let mut allowed = false;
            let mut reporter_index = 0;
            for reporter in prop.get_reporters() {
                if reporter.get_public_key() == signer && reporter.get_authorized() {
                    allowed = true;
                    reporter_index = reporter.get_index();
                    break;
                }
            }
            if !allowed {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Reporter is not authorized: {}",
                    signer
                )));
            }

            if prop.fixed {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Property is fixed and cannot be updated: {}",
                    prop.name
                )));
            }

            if data_type != prop.data_type {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Update has wrong type: {:?} != {:?}",
                    data_type, prop.data_type
                )));
            }

            let page_number = prop.get_current_page();
            let mut page = match state.get_property_page(record_id, name, page_number) {
                Ok(Some(page)) => page,
                Ok(None) => {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Property page does not exist",
                    )))
                }
                Err(err) => return Err(err),
            };

            let reported_value = match self._make_new_reported_value(
                reporter_index,
                timestamp,
                update,
                &prop,
            ) {
                Ok(reported_value) => reported_value,
                Err(err) => return Err(err),
            };
            page.reported_values.push(reported_value);
            page.reported_values
                .sort_by_key(|rv| (rv.clone().timestamp, rv.clone().reporter_index));
            state.set_property_page(record_id, name, page_number, page.clone())?;
            if page.reported_values.len() >= PROPERTY_PAGE_MAX_LENGTH {
                let mut new_page_number = page_number + 1;
                if page_number + 1 <= PROPERTY_PAGE_MAX_LENGTH as u32 {
                    new_page_number = 1;
                }

                let new_page = match state.get_property_page(record_id, name, new_page_number) {
                    Ok(Some(mut new_page)) => {
                        new_page.set_reported_values(RepeatedField::from_vec(Vec::new()));
                        new_page
                    }
                    Ok(None) => {
                        let mut new_page = property::PropertyPage::new();
                        new_page.set_name(name.to_string());
                        new_page.set_record_id(record_id.to_string());
                        new_page
                    }
                    Err(err) => return Err(err),
                };
                state.set_property_page(record_id, name, new_page_number, new_page)?;

                prop.set_current_page(new_page_number);
                if new_page_number == 1 && !prop.get_wrapped() {
                    prop.set_wrapped(true);
                }
                state.set_property(record_id, name, prop)?;
            }
        }

        Ok(())
    }

    fn _create_proposal(
        &self,
        payload: payload::CreateProposal,
        mut state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError> {
        let record_id = payload.record_id;
        let receiving_account = payload.receiving_account;
        let role = payload.role;
        let properties = payload.properties;

        match state.get_account(signer) {
            Ok(Some(account)) => account,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Issuing account does not exist: {}",
                    signer
                )))
            }
            Err(err) => return Err(err),
        };

        match state.get_account(&receiving_account) {
            Ok(Some(account)) => account,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Receiving account does not exist: {}",
                    receiving_account
                )))
            }
            Err(err) => return Err(err),
        };

        let mut proposals = match state.get_proposal_container(&record_id, &receiving_account) {
            Ok(Some(proposals)) => proposals,
            Ok(None) => proposal::ProposalContainer::new(),
            Err(err) => return Err(err),
        };

        let mut open_proposals = Vec::<proposal::Proposal>::new();
        for prop in proposals.get_entries() {
            if prop.status == proposal::Proposal_Status::OPEN {
                open_proposals.push(prop.clone());
            }
        }

        for prop in open_proposals {
            if prop.get_receiving_account() == receiving_account && prop.get_role() == role
                && prop.get_record_id() == record_id
            {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Proposal already exists",
                )));
            }
        }

        let proposal_record = match state.get_record(&record_id) {
            Ok(Some(record)) => record,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Record does not exist: {}",
                    record_id
                )))
            }
            Err(err) => return Err(err),
        };

        if proposal_record.get_field_final() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Record is final: {}",
                record_id
            )));
        }

        if role == proposal::Proposal_Role::OWNER || role == proposal::Proposal_Role::REPORTER {
            let owner = match proposal_record.owners.last() {
                Some(owner) => owner,
                None => {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Owner not found",
                    )))
                }
            };
            if owner.get_account_id() != signer {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Only the owner can create a proposal to change ownership",
                )));
            }
        }

        if role == proposal::Proposal_Role::CUSTODIAN {
            let custodian = match proposal_record.custodians.last() {
                Some(custodian) => custodian,
                None => {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Custodian not found",
                    )))
                }
            };

            if custodian.get_account_id() != signer {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Only the custodian can create a proposal to change custodianship",
                )));
            }
        }

        let mut new_proposal = proposal::Proposal::new();
        new_proposal.set_record_id(record_id.to_string());
        new_proposal.set_timestamp(timestamp);
        new_proposal.set_issuing_account(signer.to_string());
        new_proposal.set_receiving_account(receiving_account.to_string());
        new_proposal.set_role(role);
        new_proposal.set_properties(properties);
        new_proposal.set_status(proposal::Proposal_Status::OPEN);

        proposals.entries.push(new_proposal);
        proposals.entries.sort_by_key(|p| {
            (
                p.clone().record_id,
                p.clone().receiving_account,
                p.clone().timestamp,
            )
        });
        state.set_proposal_container(&record_id, &receiving_account, proposals)?;

        Ok(())
    }

    fn _answer_proposal(
        &self,
        payload: payload::AnswerProposal,
        mut state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError> {
        let record_id = payload.get_record_id();
        let receiving_account = payload.get_receiving_account();
        let role = payload.get_role();
        let response = payload.get_response();

        let mut proposals = match state.get_proposal_container(record_id, receiving_account) {
            Ok(Some(proposals)) => proposals,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Proposal does not exist",
                )))
            }
            Err(err) => return Err(err),
        };

        let mut exists = false;
        let mut current_proposal = match proposals.clone().entries.last() {
            Some(current_proposal) => current_proposal.clone(),
            None => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "No open proposals found for record {} for {}",
                    record_id, receiving_account
                )))
            }
        };

        let mut proposal_index = 0;
        let mut count = 0;

        for prop in proposals.get_entries() {
            if prop.get_receiving_account() == receiving_account && prop.get_role() == role
                && prop.get_record_id() == record_id
                && prop.status == proposal::Proposal_Status::OPEN
            {
                current_proposal = prop.clone();
                exists = true;
                proposal_index = count;
                break;
            }
            count = count + 1;
        }

        if !exists {
            return Err(ApplyError::InvalidTransaction(format!(
                "No open proposals found for record {} for {}",
                record_id, receiving_account
            )));
        }

        match response {
            payload::AnswerProposal_Response::CANCEL => {
                if current_proposal.get_issuing_account() != signer {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Only the issuing account can cancel a proposal",
                    )));
                }
                current_proposal.status = proposal::Proposal_Status::CANCELED;
            }
            payload::AnswerProposal_Response::REJECT => {
                if current_proposal.get_receiving_account() != signer {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Only the receiving account can reject a proposal",
                    )));
                }
                current_proposal.status = proposal::Proposal_Status::REJECTED;
            }
            payload::AnswerProposal_Response::ACCEPT => {
                if current_proposal.get_receiving_account() != signer {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Only the receiving account can Accept a proposal",
                    )));
                };

                let mut proposal_record = match state.get_record(record_id) {
                    Ok(Some(record)) => record,
                    Ok(None) => {
                        return Err(ApplyError::InvalidTransaction(format!(
                            "Record in proposal does not exist: {}",
                            record_id
                        )))
                    }
                    Err(err) => return Err(err),
                };

                let owner = match proposal_record.clone().owners.last() {
                    Some(owner) => owner.clone(),
                    None => {
                        return Err(ApplyError::InvalidTransaction(String::from(
                            "Owner not found",
                        )))
                    }
                };

                let custodian = match proposal_record.clone().custodians.last() {
                    Some(custodian) => custodian.clone(),
                    None => {
                        return Err(ApplyError::InvalidTransaction(String::from(
                            "Custodian not found",
                        )))
                    }
                };

                match role {
                    proposal::Proposal_Role::OWNER => {
                        if owner.get_account_id() != current_proposal.get_issuing_account() {
                            current_proposal.status = proposal::Proposal_Status::CANCELED;
                            info!("Record owner does not match the issuing account of the proposal");
                            // remove old proposal and replace with new one
                            proposals.entries.remove(proposal_index);
                            proposals.entries.push(current_proposal);
                            proposals.entries.sort_by_key(|p| {
                                (
                                    p.clone().record_id,
                                    p.clone().receiving_account,
                                    p.clone().timestamp,
                                )
                            });
                            state.set_proposal_container(&record_id, &receiving_account, proposals)?;
                            return Ok(());
                        }

                        let mut new_owner = record::Record_AssociatedAccount::new();
                        new_owner.set_account_id(receiving_account.to_string());
                        new_owner.set_timestamp(timestamp);
                        proposal_record.owners.push(new_owner);
                        state.set_record(record_id, proposal_record.clone())?;

                        let record_type =
                            match state.get_record_type(proposal_record.get_record_type()) {
                                Ok(Some(record_type)) => record_type,
                                Ok(None) => {
                                    return Err(ApplyError::InvalidTransaction(format!(
                                        "RecordType does not exist: {}",
                                        proposal_record.get_record_type()
                                    )))
                                }
                                Err(err) => return Err(err),
                            };

                        for prop_schema in record_type.get_properties() {
                            let mut prop =
                                match state.get_property(record_id, prop_schema.get_name()) {
                                    Ok(Some(prop)) => prop,
                                    Ok(None) => {
                                        return Err(ApplyError::InvalidTransaction(String::from(
                                            "Property does not exist",
                                        )))
                                    }
                                    Err(err) => return Err(err),
                                };

                            let mut authorized = false;
                            let mut new_reporters: Vec<
                                property::Property_Reporter,
                            > = Vec::new();
                            let temp_prob = prop.clone();
                            let reporters = temp_prob.get_reporters();
                            for reporter in reporters {
                                if reporter.get_public_key() == owner.get_account_id() {
                                    let mut new_reporter = reporter.clone();
                                    new_reporter.set_authorized(false);
                                    new_reporters.push(new_reporter);
                                } else if reporter.get_public_key() == receiving_account {
                                    let mut new_reporter = reporter.clone();
                                    new_reporter.set_authorized(true);
                                    authorized = true;
                                    new_reporters.push(new_reporter);
                                } else {
                                    new_reporters.push(reporter.clone());
                                }
                            }

                            if !authorized {
                                let mut reporter = property::Property_Reporter::new();
                                reporter.set_public_key(receiving_account.to_string());
                                reporter.set_authorized(true);
                                reporter.set_index(prop.reporters.len() as u32);
                                new_reporters.push(reporter);
                            }

                            prop.set_reporters(RepeatedField::from_vec(new_reporters));
                            state.set_property(record_id, prop.get_name(), prop.clone())?;
                        }
                        current_proposal.status = proposal::Proposal_Status::ACCEPTED;
                    }
                    proposal::Proposal_Role::CUSTODIAN => {
                        if custodian.get_account_id() != current_proposal.get_issuing_account() {
                            current_proposal.status = proposal::Proposal_Status::CANCELED;
                            info!(
                                "Record custodian does not match the issuing account of the proposal"
                            );
                            // remove old proposal and replace with new one
                            proposals.entries.remove(proposal_index);
                            proposals.entries.push(current_proposal.clone());
                            proposals.entries.sort_by_key(|p| {
                                (
                                    p.clone().record_id,
                                    p.clone().receiving_account,
                                    p.clone().timestamp,
                                )
                            });
                            state.set_proposal_container(
                                &record_id,
                                &receiving_account,
                                proposals.clone(),
                            )?;
                        }

                        let mut new_custodian = record::Record_AssociatedAccount::new();
                        new_custodian.set_account_id(receiving_account.to_string());
                        new_custodian.set_timestamp(timestamp);
                        proposal_record.custodians.push(new_custodian.clone());
                        state.set_record(record_id, proposal_record)?;
                        current_proposal.status = proposal::Proposal_Status::ACCEPTED;
                    }
                    proposal::Proposal_Role::REPORTER => {
                        if owner.get_account_id() != current_proposal.get_issuing_account() {
                            current_proposal.status = proposal::Proposal_Status::CANCELED;
                            info!("Record owner does not match the issuing account of the proposal");
                            // remove old proposal and replace with new one
                            proposals.entries.remove(proposal_index);
                            proposals.entries.push(current_proposal);
                            proposals.entries.sort_by_key(|p| {
                                (
                                    p.clone().record_id,
                                    p.clone().receiving_account,
                                    p.clone().timestamp,
                                )
                            });
                            state.set_proposal_container(&record_id, &receiving_account, proposals)?;
                            return Ok(());
                        }

                        let mut reporter = property::Property_Reporter::new();
                        reporter.set_public_key(receiving_account.to_string());
                        reporter.set_authorized(true);

                        for prop_name in current_proposal.get_properties() {
                            let mut prop = match state.get_property(record_id, prop_name) {
                                Ok(Some(prop)) => prop,
                                Ok(None) => {
                                    return Err(ApplyError::InvalidTransaction(String::from(
                                        "Property does not exist",
                                    )))
                                }
                                Err(err) => return Err(err),
                            };
                            reporter.set_index(prop.reporters.len() as u32);
                            prop.reporters.push(reporter.clone());
                            state.set_property(record_id, prop_name, prop)?;
                        }
                        current_proposal.status = proposal::Proposal_Status::ACCEPTED;
                    }
                }
            }
        }
        // remove old proposal and replace with new one
        proposals.entries.remove(proposal_index);
        proposals.entries.push(current_proposal.clone());
        proposals.entries.sort_by_key(|p| {
            (
                p.clone().record_id,
                p.clone().receiving_account,
                p.clone().timestamp,
            )
        });
        state.set_proposal_container(&record_id, &receiving_account, proposals)?;

        Ok(())
    }

    fn _revoke_reporter(
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

    fn _make_new_reported_value(
        &self,
        reporter_index: u32,
        timestamp: u64,
        value: &property::PropertyValue,
        property: &property::Property,
    ) -> Result<property::PropertyPage_ReportedValue, ApplyError> {
        let mut reported_value = property::PropertyPage_ReportedValue::new();
        reported_value.set_reporter_index(reporter_index);
        reported_value.set_timestamp(timestamp);

        match value.get_data_type() {
            property::PropertySchema_DataType::TYPE_UNSET => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "DataType is not set",
                )))
            }
            property::PropertySchema_DataType::BYTES => {
                reported_value.set_bytes_value(value.get_bytes_value().to_vec())
            }
            property::PropertySchema_DataType::BOOLEAN => {
                reported_value.set_boolean_value(value.get_boolean_value())
            }
            property::PropertySchema_DataType::NUMBER => {
                reported_value.set_number_value(value.get_number_value())
            }
            property::PropertySchema_DataType::STRING => {
                reported_value.set_string_value(value.get_string_value().to_string())
            }
            property::PropertySchema_DataType::ENUM => {
                let enum_name = value.get_enum_value().to_string();
                let enum_index = match property.enum_options.iter()
                    .position(|name| name == &enum_name) {
                    Some(index) => index,
                    None => {
                        return Err(ApplyError::InvalidTransaction(format!(
                            "Provided enum name is not a valid option: {}",
                            enum_name,
                        )))
                    }
                };
                reported_value.set_enum_value(enum_index as u32)
            }
            property::PropertySchema_DataType::STRUCT => {
                match self._validate_struct_values(
                    &value.struct_values,
                    &property.struct_properties
                ) {
                    Ok(_) => (),
                    Err(e) => return Err(e),
                }

                let struct_values = RepeatedField::from_vec(value.get_struct_values().to_vec());
                reported_value.set_struct_values(struct_values)
            }
            property::PropertySchema_DataType::LOCATION => {
                reported_value.set_location_value(value.get_location_value().clone())
            }
        };
        Ok(reported_value)
    }

    fn _validate_struct_values(
        &self,
        struct_values: &RepeatedField<property::PropertyValue>,
        schema_values: &RepeatedField<property::PropertySchema>
    ) -> Result<(), ApplyError> {
        if struct_values.len() != schema_values.len() {
            return Err(ApplyError::InvalidTransaction(format!(
                "Provided struct does not match schema length: {:?} != {:?}",
                struct_values.len(),
                schema_values.len(),
            )))
        }

        for schema in schema_values.iter() {
            let value = match struct_values.iter().find(|val| val.name == schema.name) {
                Some(val) => val,
                None => return Err(ApplyError::InvalidTransaction(format!(
                    "Provided struct missing required property from schema: {}",
                    schema.name,
                )))
            };

            if value.data_type != schema.data_type {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Struct property \"{}\" must have data type: {:?}",
                    schema.name,
                    schema.data_type,
                )))
            }

            if schema.data_type == property::PropertySchema_DataType::STRUCT {
                match self._validate_struct_values(
                    &value.struct_values,
                    &schema.struct_properties
                ) {
                    Ok(_) => (),
                    Err(e) => return Err(e),
                }
            }
        }

        Ok(())
    }

}

impl TransactionHandler for HamletTransactionHandler {
    fn family_name(&self) -> String {
        self.family_name.clone()
    }

    fn family_versions(&self) -> Vec<String> {
        self.family_versions.clone()
    }

    fn namespaces(&self) -> Vec<String> {
        self.namespaces.clone()
    }

    fn apply(
        &self,
        request: &TpProcessRequest,
        context: &mut TransactionContext,
    ) -> Result<(), ApplyError> {
        let payload = HamletPayload::new(request.get_payload());
        let payload = match payload {
            Err(e) => return Err(e),
            Ok(payload) => payload,
        };
        let payload = match payload {
            Some(x) => x,
            None => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Request must contain a payload",
                )))
            }
        };
        let signer = request.get_header().get_signer_public_key();
        /*
        let signer = match &header.as_ref() {
            Some(s) => &s.signer_public_key,
            None => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Invalid header",
                )))
            }
        };
*/


        let mut state = HamletState::new(context);

        info!(
            "Payload: {:?} {} {}",
            payload.get_action(),
            request.get_header().get_inputs()[0],
            request.get_header().get_outputs()[0]
        );

        match payload.get_action() {
            Action::CreateAccount(account_payload) => {
                self._create_account(account_payload, state, signer)?
            }
            Action::CreateAsset(asset_payload) => {
                self._create_asset(asset_payload, state, signer)?
            }
            Action::UpdateAsset(asset_payload) => {
                self._update_asset(asset_payload, state, signer)?
            }
            Action::CreateRecord(record_payload) => {
                self._create_record(record_payload, state, signer, payload.get_timestamp())?
            }
            Action::FinalizeRecord(finalize_payload) => {
                self._finalize_record(finalize_payload, state, signer)?
            }
            Action::CreateRecordType(record_type_payload) => {
                self._create_record_type(record_type_payload, state, signer)?
            }
            Action::UpdateProperties(update_properties_payload) => self._update_properties(
                update_properties_payload,
                state,
                signer,
                payload.get_timestamp(),
            )?,
            Action::CreateProposal(proposal_payload) => {
                self._create_proposal(proposal_payload, state, signer, payload.get_timestamp())?
            }
            Action::AnswerProposal(answer_proposal_payload) => self._answer_proposal(
                answer_proposal_payload,
                state,
                signer,
                payload.get_timestamp(),
            )?,
            Action::RevokeReporter(revoke_reporter_payload) => {
                self._revoke_reporter(revoke_reporter_payload, state, signer)?
            }
            /*
            other_action => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Invalid action: '{}'",
                    other_action
                )));
            }
            */
        }

        Ok(())
    }
}