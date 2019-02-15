use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};
use protobuf;
use crate::hamlet_state::HamletState;
use crate::protos::*;
use crate::hamlet_handler;

pub trait Proposal {

    fn create(
        &self,
        payload: payload::CreateProposal,
        state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError>;

    fn answer(
        &self,
        payload: payload::AnswerProposal,
        state: HamletState,
        signer: &str,
        timestamp: u64,
    ) -> Result<(), ApplyError>;
}
impl Proposal for &hamlet_handler::HamletTransactionHandler {

    fn create(
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

    fn answer(
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

}
