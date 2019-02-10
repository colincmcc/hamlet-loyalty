
use crate::protos::*;
use sawtooth_sdk::processor::handler::{ApplyError};
use protobuf::{RepeatedField};

pub fn _is_not_transferable(asset: asset::Asset, owner_public_key: &str) -> bool {
    if _has_rule(asset.get_rules().to_vec(), rule::Rule_RuleType::NOT_TRANSFERABLE) && asset.get_owners().contains(&owner_public_key.to_string()) {
        return true
    } else {
        return false
    }
}

pub fn _has_rule(rules: Vec<rule::Rule>, rule_type: rule::Rule_RuleType) -> bool {
    for rule in rules {
        if rule.get_field_type() == rule_type {
            return true
        }
    }
    return false
}


pub fn _make_new_reported_value(
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
            match self::_validate_struct_values(
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

pub fn _validate_struct_values(
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
            match self::_validate_struct_values(
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