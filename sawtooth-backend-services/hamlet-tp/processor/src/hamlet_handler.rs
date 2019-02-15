cfg_if! {
    if #[cfg(target_arch = "wasm32")] {
        use sabre_sdk::ApplyError;
        use sabre_sdk::TransactionContext;
        use sabre_sdk::TransactionHandler;
        use sabre_sdk::TpProcessRequest;
        use sabre_sdk::{WasmPtr, execute_entrypoint, invoke_smart_permission};
        use protos::smart_permission::{Agent, AgentList, Organization, OrganizationList, SmartPermission,
                            SmartPermissionList};
        use protobuf;
        use crate::handle;
    } else {
        use sawtooth_sdk::processor::handler::{ApplyError, TransactionContext, TransactionHandler};
        use sawtooth_sdk::messages::processor::TpProcessRequest;
    }
}
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


    #[cfg(not(target_arch = "wasm32"))]
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

        #[cfg(not(target_arch = "wasm32"))]
        info!(
            "Payload: {:?} {} {}",
            payload.get_action(),
            request.get_header().get_inputs()[0],
            request.get_header().get_outputs()[0]
        );

        #[cfg(target_arch = "wasm32")]
            let result = run_smart_permisson(
            &mut state,
            signer,
            request.get_payload())
            .map_err(|err| ApplyError::InvalidTransaction(
                format!("Unable to run smart permission: {}", err)));


        #[cfg(target_arch = "wasm32")]
            match result {
            Ok(1) => (),
            Ok(0) => return Err(ApplyError::InvalidTransaction(format!(
                "Account does not have permission: {}", signer
            ))),
            _ => return Err(ApplyError::InvalidTransaction(
                "Something went wrong".into()
            ))
        }


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
            // Possibly check for updates to processor/wasm contract
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

#[cfg(target_arch = "wasm32")]
fn run_smart_permisson(state: &mut HamletState, signer: &str, payload: &[u8]) -> Result<i32, ApplyError> {
    let account = match state.get_account(signer)? {
        Some(account) => account,
        None => return Err(ApplyError::InvalidTransaction(format!(
            "Signer is not an agent: {}", signer
        )))
    };

    let org_id = account.get_org_id();

    let smart_permission_addr = handle::compute_smart_permission_address(org_id, "hamlet");

    invoke_smart_permission(
        smart_permission_addr,
        "hamlet".to_string(),
        agent.get_roles().to_vec(),
        org_id.to_string(),
        signer.to_string(),
        payload).map_err(|err| ApplyError::InvalidTransaction(
        format!("Unable to run smart permission: {}", err)))
}


// Sabre WASM smart contract's entrypoint.
#[cfg(target_arch = "wasm32")]
// Sabre apply must return a bool
fn apply(
    request: &TpProcessRequest,
    context: &mut TransactionContext,
) -> Result<bool, ApplyError> {

    let handler = HamletTransactionHandler::new();
    match handler.apply(request, context) {
        Ok(_) => Ok(true),
        Err(err) => Err(err)
    }

}

#[cfg(target_arch = "wasm32")]
#[no_mangle]
pub unsafe fn entrypoint(payload: WasmPtr, signer: WasmPtr, signature: WasmPtr) -> i32 {
    execute_entrypoint(payload, signer, signature, apply)
}