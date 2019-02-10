use sawtooth_sdk::messages::processor::TpProcessRequest;
use sawtooth_sdk::processor::handler::{ApplyError, TransactionContext, TransactionHandler};
use protobuf;

use crate::hamlet_state::HamletState;
use crate::hamlet_payload::{HamletPayload, Action};
use crate::std_ext::addressing::get_hamlet_prefix;
use crate::handlers::*;

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

        let state = HamletState::new(context);

        info!(
            "Payload: {:?} {} {}",
            payload.get_action(),
            request.get_header().get_inputs()[0],
            request.get_header().get_outputs()[0]
        );

        match payload.get_action() {
            Action::CreateAccount(account_payload) => {
                account_state::Account::create(&self, account_payload, state, signer)?
            }
            Action::CreateAsset(asset_payload) => {
                asset_state::Asset::create(&self, asset_payload, state, signer)?
            }
            Action::UpdateAsset(asset_payload) => {
                asset_state::Asset::update(&self, asset_payload, state, signer)?
            }
            Action::CreateHolding(holding_payload) => {
                holding_state::Holding::create(&self, holding_payload, state, signer)?
            }
            Action::CreateOffer(offer_payload) => {
                offer_state::Offer::create(&self, offer_payload, state, signer)?
            }
            Action::AcceptOffer(offer_payload) => {
                offer_state::Offer::accept(&self, offer_payload, state, signer)?
            }
            Action::CloseOffer(offer_payload) => {
                offer_state::Offer::close(&self, offer_payload, state, signer)?
            }
            Action::CreateRecord(record_payload) => {
                record_state::Record::create(&self, record_payload, state, signer, payload.get_timestamp())?
            }
            Action::FinalizeRecord(finalize_payload) => {
                record_state::Record::finalize(&self, finalize_payload, state, signer)?
            }
            Action::CreateRecordType(record_type_payload) => {
                record_type_state::RecordType::create(&self, record_type_payload, state, signer)?
            }
            Action::UpdateProperties(update_properties_payload) => property_state::Property::update(
                &self,
                update_properties_payload,
                state,
                signer,
                payload.get_timestamp(),
            )?,
            Action::CreateProposal(proposal_payload) => {
                proposal_state::Proposal::create(&self, proposal_payload, state, signer, payload.get_timestamp())?
            }
            Action::AnswerProposal(answer_proposal_payload) => proposal_state::Proposal::answer(
                &self,
                answer_proposal_payload,
                state,
                signer,
                payload.get_timestamp(),
            )?,
            Action::RevokeReporter(revoke_reporter_payload) => {
                reporter_state::Reporter::revoke(&self, revoke_reporter_payload, state, signer)?
            }
            /*
            // TODO: catch unregistered actions
            // Possibly check for updates to processor
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