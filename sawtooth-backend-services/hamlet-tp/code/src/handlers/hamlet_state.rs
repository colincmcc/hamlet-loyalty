use crypto::digest::Digest;
use crypto::sha2::Sha512;
use sawtooth_sdk::processor::handler::ApplyError;
use sawtooth_sdk::processor::handler::TransactionContext;
use std::collections::hash_map::Entry;
use std::collections::HashMap;
use std::str::from_utf8;
use crate::addressing::*;
use crate::protos::*;
use protobuf::Message;
use protobuf;

pub struct HamletState<'a> {
    context: &'a mut TransactionContext
}

impl<'a> HamletState<'a> {
    pub fn new(context: &'a mut TransactionContext) -> HamletState {
        HamletState {
            context
        }
    }


    pub fn get_asset(&mut self, asset_name: &str) -> Result<Option<asset::Asset>, ApplyError> {
        let address = make_asset_address(asset_name);
        let asset_containers = self.context.get_state(vec![address])?;

        match asset_containers {
            Some(packed) => {
                let assets: asset::AssetContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(assets) => assets,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize asset container",
                            )))
                        }
                    };

                for asset in assets.get_entries() {
                    if asset.name == asset_name {
                        return Ok(Some(asset.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_asset(&mut self, asset_name: &str, a: asset::Asset) -> Result<(), ApplyError> {
        let address = make_asset_address(asset_name);
        let asset_containers = self.context.get_state(vec![address.clone()])?;

        let mut asset_container = match asset_containers {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(assets) => assets,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize asset container",
                    )))
                }
            },
            None => asset::AssetContainer::new(),
        };
        /*
         *  Remove old asset if it exists and sort the assets by name
         */
        let assets = asset_container.get_entries().to_vec();
        let mut index = None;
        let mut count = 0;

        // Find the existing Asset's index in the deserialized Asset list
        for asset in assets.clone() {
            if asset.name == asset_name {
                index = Some(count);
                break;
            }
            count = count + 1;
        }

        // Match that index in the container and remove the entry
        match index {
            Some(x) => {
                asset_container.entries.remove(x);
            }
            None => (),
        };

        asset_container.entries.push(a);
        asset_container
            .entries
            .sort_by_key(|x| x.clone().name);

        let serialized = match asset_container.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize asset container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }


    pub fn get_account(&mut self, account_id: &str) -> Result<Option<account::Account>, ApplyError> {
        let address = make_account_address(account_id);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let accounts: account::AccountContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(accounts) => accounts,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize account container",
                            )))
                        }
                    };

                for account in accounts.get_entries() {
                    if account.public_key == account_id {
                        return Ok(Some(account.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_account(&mut self, account_id: &str, account: account::Account) -> Result<(), ApplyError> {
        let address = make_account_address(account_id);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut accounts = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(accounts) => accounts,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize account container",
                    )))
                }
            },
            None => account::AccountContainer::new(),
        };

        accounts.entries.push(account);
        accounts.entries.sort_by_key(|a| a.clone().public_key);
        let serialized = match accounts.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize account container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }

    pub fn get_holding(&mut self, holding_id: &str) -> Result<Option<holding::Holding>, ApplyError> {
        let address = make_holding_address(holding_id);
        let holding_containers = self.context.get_state(vec![address])?;

        match holding_containers {
            Some(packed) => {
                let holdings: holding::HoldingContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(holdings) => holdings,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize holding container",
                            )))
                        }
                    };

                for holding in holdings.get_entries() {
                    if holding.id == holding_id {
                        return Ok(Some(holding.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_holding(&mut self, holding_id: &str, a: holding::Holding) -> Result<(), ApplyError> {
        let address = make_holding_address(holding_id);
        let holding_containers = self.context.get_state(vec![address.clone()])?;

        let mut holding_container = match holding_containers {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(holdings) => holdings,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize holding container",
                    )))
                }
            },
            None => holding::HoldingContainer::new(),
        };
        /*
         *  Remove old holding if it exists and sort the assets by name
         */
        let holdings = holding_container.get_entries().to_vec();
        let mut index = None;
        let mut count = 0;

        // Find the existing Asset's index in the deserialized Asset list
        for holding in holdings.clone() {
            if holding.id == holding_id {
                index = Some(count);
                break;
            }
            count = count + 1;
        }

        // Match that index in the container and remove the entry
        match index {
            Some(x) => {
                holding_container.entries.remove(x);
            }
            None => (),
        };

        holding_container.entries.push(a);
        holding_container
            .entries
            .sort_by_key(|x| x.clone().id);

        let serialized = match holding_container.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize holding container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }


    pub fn get_property(
        &mut self,
        record_id: &str,
        property_name: &str,
    ) -> Result<Option<property::Property>, ApplyError> {
        let address = make_property_address(record_id, property_name, 0);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let properties: property::PropertyContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(properties) => properties,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize property container",
                            )))
                        }
                    };

                for property in properties.get_entries() {
                    if property.name == property_name {
                        return Ok(Some(property.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_property(
        &mut self,
        record_id: &str,
        property_name: &str,
        property: property::Property,
    ) -> Result<(), ApplyError> {
        let address = make_property_address(record_id, property_name, 0);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut property_container = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(properties) => properties,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize property container",
                    )))
                }
            },
            None => property::PropertyContainer::new(),
        };
        // remove old property if it exists and sort the properties by name
        let properties = property_container.get_entries().to_vec();
        let mut index = None;
        let mut count = 0;
        for prop in properties.clone() {
            if prop.name == property_name {
                index = Some(count);
                break;
            }
            count = count + 1;
        }

        match index {
            Some(x) => {
                property_container.entries.remove(x);
            }
            None => (),
        };
        property_container.entries.push(property);
        property_container.entries.sort_by_key(|p| p.clone().name);
        let serialized = match property_container.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize property container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }

    pub fn get_property_page(
        &mut self,
        record_id: &str,
        property_name: &str,
        page: u32,
    ) -> Result<Option<property::PropertyPage>, ApplyError> {
        let address = make_property_address(record_id, property_name, page);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let property_pages: property::PropertyPageContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(property_pages) => property_pages,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize property page container",
                            )))
                        }
                    };

                for property_page in property_pages.get_entries() {
                    if property_page.name == property_name {
                        return Ok(Some(property_page.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_property_page(
        &mut self,
        record_id: &str,
        property_name: &str,
        page_num: u32,
        property_page: property::PropertyPage,
    ) -> Result<(), ApplyError> {
        let address = make_property_address(record_id, property_name, page_num);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut property_pages = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(property_pages) => property_pages,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize property page container",
                    )))
                }
            },
            None => property::PropertyPageContainer::new(),
        };
        // remove old property page if it exists and sort the property pages by name
        let pages = property_pages.get_entries().to_vec();
        let mut index = None;
        let mut count = 0;
        for page in pages.clone() {
            if page.name == property_name {
                index = Some(count);
                break;
            }
            count = count + 1;
        }

        match index {
            Some(x) => {
                property_pages.entries.remove(x);
            }
            None => (),
        };
        property_pages.entries.push(property_page);
        property_pages.entries.sort_by_key(|pp| pp.clone().name);
        let serialized = match property_pages.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize property page container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }

    pub fn get_proposal_container(
        &mut self,
        record_id: &str,
        account_id: &str,
    ) -> Result<Option<proposal::ProposalContainer>, ApplyError> {
        let address = make_proposal_address(record_id, account_id);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let proposals: proposal::ProposalContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(property_pages) => property_pages,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize proposal container",
                            )))
                        }
                    };

                Ok(Some(proposals))
            }
            None => Ok(None),
        }
    }

    pub fn set_proposal_container(
        &mut self,
        record_id: &str,
        account_id: &str,
        proposals: proposal::ProposalContainer,
    ) -> Result<(), ApplyError> {
        let address = make_proposal_address(record_id, account_id);
        let serialized = match proposals.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize proposal container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }


    pub fn get_record(&mut self, record_id: &str) -> Result<Option<record::Record>, ApplyError> {
        let address = make_record_address(record_id);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let records: record::RecordContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(records) => records,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize record container",
                            )))
                        }
                    };

                for record in records.get_entries() {
                    if record.record_id == record_id {
                        return Ok(Some(record.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_record(
        &mut self,
        record_id: &str,
        record: record::Record,
    ) -> Result<(), ApplyError> {
        let address = make_record_address(record_id);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut record_container = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(records) => records,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize record container",
                    )))
                }
            },
            None => record::RecordContainer::new(),
        };
        // remove old record if it exists and sort the records by record id
        let records = record_container.get_entries().to_vec();
        let mut index = None;
        let mut count = 0;
        for record in records.clone() {
            if record.record_id == record_id {
                index = Some(count);
                break;
            }
            count = count + 1;
        }

        match index {
            Some(x) => {
                record_container.entries.remove(x);
            }
            None => (),
        };
        record_container.entries.push(record);
        record_container
            .entries
            .sort_by_key(|r| r.clone().record_id);
        let serialized = match record_container.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize record container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }

    pub fn get_record_type(
        &mut self,
        type_name: &str,
    ) -> Result<Option<record::RecordType>, ApplyError> {
        let address = make_record_type_address(type_name);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let record_types: record::RecordTypeContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(record_types) => record_types,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize record type container",
                            )))
                        }
                    };

                for record_type in record_types.get_entries() {
                    if record_type.name == type_name {
                        return Ok(Some(record_type.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_record_type(
        &mut self,
        type_name: &str,
        record_type: record::RecordType,
    ) -> Result<(), ApplyError> {
        let address = make_record_type_address(type_name);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut record_types = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(record_types) => record_types,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize record container",
                    )))
                }
            },
            None => record::RecordTypeContainer::new(),
        };

        record_types.entries.push(record_type);
        record_types.entries.sort_by_key(|rt| rt.clone().name);
        let serialized = match record_types.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize record type container",
                )))
            }
        };
        let mut sets = HashMap::new();
        sets.insert(address, serialized);
        self.context
            .set_state(sets)
            .map_err(|err| ApplyError::InternalError(format!("{}", err)))?;
        Ok(())
    }
}