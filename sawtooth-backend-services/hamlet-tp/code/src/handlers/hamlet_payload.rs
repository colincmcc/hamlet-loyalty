use sawtooth_sdk::processor::handler::ApplyError;
use crate::protos::*;
use protobuf;


#[derive(Debug, Clone)]
pub enum Action {
    CreateAsset(payload::CreateAsset),
    CreateAccount(payload::CreateAccount),
    CreateRecord(payload::CreateRecord),
    FinalizeRecord(payload::FinalizeRecord),
    CreateRecordType(payload::CreateRecordType),
    UpdateProperties(payload::UpdateProperties),
    CreateProposal(payload::CreateProposal),
    AnswerProposal(payload::AnswerProposal),
    RevokeReporter(payload::RevokeReporter),
    UpdateAsset(payload::UpdateAsset),
}

pub struct HamletPayload {
    action: Action,
    timestamp: u64
}

impl HamletPayload {
    pub fn new(payload: &[u8]) -> Result<Option<HamletPayload>, ApplyError> {
        let payload: payload::TransactionPayload = match protobuf::parse_from_bytes(payload) {
            Ok(payload) => payload,
            Err(_) => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Cannot deserialize payload",
                )))
            }
        };

        let hamlet_action = payload.get_payload_type();
        let action = match hamlet_action {
            payload::TransactionPayload_PayloadType::CREATE_ASSET => {
                let create_asset = payload.get_create_asset();
                if create_asset.get_name() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Asset name cannot be an empty string",
                    )));
                }
                Action::CreateAsset(create_asset.clone())
            }
            payload::TransactionPayload_PayloadType::UPDATE_ASSET => {
                let update_asset = payload.get_update_asset();
                if update_asset.get_name() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Asset name cannot be an empty string",
                    )));
                }
                Action::UpdateAsset(update_asset.clone())
            }
            payload::TransactionPayload_PayloadType::CREATE_ACCOUNT => {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            //
            // TODO: Implement below options
            //
            payload::TransactionPayload_PayloadType::CREATE_HOLDING=> {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            payload::TransactionPayload_PayloadType::CREATE_OFFER => {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            payload::TransactionPayload_PayloadType::CLOSE_OFFER => {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            payload::TransactionPayload_PayloadType::ACCEPT_OFFER => {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            payload::TransactionPayload_PayloadType::TYPE_UNSET => {
                let create_account = payload.get_create_account();
                if create_account.get_label() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Account name cannot be an empty string",
                    )));
                }
                Action::CreateAccount(create_account.clone())
            }
            payload::TransactionPayload_PayloadType::CREATE_RECORD => {
                let create_record = payload.get_create_record();
                if create_record.get_record_id() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Record id cannot be empty string",
                    )));
                }
                Action::CreateRecord(create_record.clone())
            }
            payload::TransactionPayload_PayloadType::FINALIZE_RECORD => {
                Action::FinalizeRecord(payload.get_finalize_record().clone())
            }
            payload::TransactionPayload_PayloadType::CREATE_RECORD_TYPE => {
                let create_record_type = payload.get_create_record_type();
                if create_record_type.get_name() == "" {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Record Type name cannot be an empty string",
                    )));
                };
                let properties = create_record_type.get_properties();
                if properties.len() == 0 {
                    return Err(ApplyError::InvalidTransaction(String::from(
                        "Record type must have at least one property",
                    )));
                }
                for prop in properties {
                    if prop.name == "" {
                        return Err(ApplyError::InvalidTransaction(String::from(
                            "Property name cannot be an empty string",
                        )));
                    }
                }

                Action::CreateRecordType(create_record_type.clone())
            }
            payload::TransactionPayload_PayloadType::UPDATE_PROPERTIES => {
                Action::UpdateProperties(payload.get_update_properties().clone())
            }
            payload::TransactionPayload_PayloadType::CREATE_PROPOSAL => {
                Action::CreateProposal(payload.get_create_proposal().clone())
            }
            payload::TransactionPayload_PayloadType::ANSWER_PROPOSAL => {
                Action::AnswerProposal(payload.get_answer_proposal().clone())
            }
            payload::TransactionPayload_PayloadType::REVOKE_REPORTER => {
                Action::RevokeReporter(payload.get_revoke_reporter().clone())
            }
        };
        let timestamp = match payload.get_timestamp() {
            0 => {
                return Err(ApplyError::InvalidTransaction(String::from(
                    "Timestamp is not set",
                )))
            }
            x => x,
        };

        Ok(Some(HamletPayload {
            action: action,
            timestamp: timestamp
        }))
    }

    pub fn get_action(&self) -> Action {
        self.action.clone()
    }

    pub fn get_timestamp(&self) -> u64 {
        self.timestamp
    }
}