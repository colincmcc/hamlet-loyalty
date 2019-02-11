cfg_if! {
    if #[cfg(target_arch = "wasm32")] {
        use sabre_sdk::ApplyError;
        use sabre_sdk::TransactionContext;
    } else {
        use sawtooth_sdk::processor::handler::ApplyError;
        use sawtooth_sdk::processor::handler::TransactionContext;
    }
}

use std::collections::HashMap;
use protobuf::Message;
use protobuf;
use crate::std_ext::addressing::*;
use crate::protos::*;

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

    pub fn get_offer(&mut self, offer_id: &str) -> Result<Option<offer::Offer>, ApplyError> {
        let address = make_offer_address(offer_id);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let offers: offer::OfferContainer =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(offers) => offers,
                        Err(_) => {
                            return Err(ApplyError::InternalError(String::from(
                                "Cannot deserialize account container",
                            )))
                        }
                    };

                for offer in offers.get_entries() {
                    if offer.id == offer_id {
                        return Ok(Some(offer.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    pub fn set_offer(&mut self, offer_id: &str, offer: offer::Offer) -> Result<(), ApplyError> {
        let address = make_offer_address(offer_id);
        let d = self.context.get_state(vec![address.clone()])?;
        let mut offers = match d {
            Some(packed) => match protobuf::parse_from_bytes(packed.as_slice()) {
                Ok(offers) => offers,
                Err(_) => {
                    return Err(ApplyError::InternalError(String::from(
                        "Cannot deserialize offer container",
                    )))
                }
            },
            None => offer::OfferContainer::new(),
        };

        offers.entries.push(offer);
        offers.entries.sort_by_key(|a| a.clone().id);
        let serialized = match offers.write_to_bytes() {
            Ok(serialized) => serialized,
            Err(_) => {
                return Err(ApplyError::InternalError(String::from(
                    "Cannot serialize offer container",
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

    pub fn update_holding(
        &mut self,
        holding_id: &str,
        new_quantity: i64
    ) -> Result<(), ApplyError>{

        let holding = match self.get_holding(holding_id) {
            Ok(Some(updated_holding)) => updated_holding,
            Ok(None) => {
                return Err(ApplyError::InvalidTransaction(format!(
                    "Holding does not exist: {}",
                    holding_id
                )))
            }
            Err(err) => return Err(err),
        };

        let mut updated_holding = holding.clone();

        updated_holding.set_quantity(new_quantity);
        self.set_holding(holding_id, updated_holding)?;
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


    #[cfg(target_arch = "wasm32")]
    pub fn get_agent(&mut self, public_key: &str) -> Result<Option<Agent>, ApplyError> {
        let address = compute_agent_address(public_key);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let agents: AgentList = match protobuf::parse_from_bytes(packed.as_slice()) {
                    Ok(agents) => agents,
                    Err(err) => {
                        return Err(ApplyError::InternalError(format!(
                            "Cannot deserialize record container: {:?}",
                            err,
                        )))
                    }
                };

                for agent in agents.get_agents() {
                    if agent.public_key == public_key {
                        return Ok(Some(agent.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    #[cfg(target_arch = "wasm32")]
    pub fn get_organization(&mut self, id: &str) -> Result<Option<Organization>, ApplyError> {
        let address = compute_org_address(id);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let orgs: OrganizationList = match protobuf::parse_from_bytes(packed.as_slice()) {
                    Ok(orgs) => orgs,
                    Err(err) => {
                        return Err(ApplyError::InternalError(format!(
                            "Cannot deserialize organization list: {:?}",
                            err,
                        )))
                    }
                };

                for org in orgs.get_organizations() {
                    if org.org_id == id {
                        return Ok(Some(org.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }

    #[cfg(target_arch = "wasm32")]
    pub fn get_smart_permission(
        &mut self,
        org_id: &str,
        name: &str,
    ) -> Result<Option<SmartPermission>, ApplyError> {
        let address = compute_smart_permission_address(org_id, name);
        let d = self.context.get_state(vec![address])?;
        match d {
            Some(packed) => {
                let smart_permissions: SmartPermissionList =
                    match protobuf::parse_from_bytes(packed.as_slice()) {
                        Ok(smart_permissions) => smart_permissions,
                        Err(err) => {
                            return Err(ApplyError::InternalError(format!(
                                "Cannot deserialize smart permission list: {:?}",
                                err,
                            )))
                        }
                    };

                for smart_permission in smart_permissions.get_smart_permissions() {
                    if smart_permission.name == name {
                        return Ok(Some(smart_permission.clone()));
                    }
                }
                Ok(None)
            }
            None => Ok(None),
        }
    }
}