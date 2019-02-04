use crate::protos::*;
use sawtooth_sdk::messages;

fn encode_payload(payload_type: payload::TransactionPayload_PayloadType){
    match payload_type {
        payload::TransactionPayload_PayloadType::CREATE_ASSET => {

        }
        payload::TransactionPayload_PayloadType::CREATE_ACCOUNT => {

        }
    }
}