
use crypto::digest::Digest;
use crypto::sha2::Sha512;

#[cfg(target_arch = "wasm32")]
const PIKE_NAMESPACE: &'static str = "cad11d";

/// The smart permission prefix for global state (00ec03)
#[cfg(target_arch = "wasm32")]
const SMART_PERMISSION_PREFIX: &'static str = "00ec03";

#[cfg(target_arch = "wasm32")]
const PIKE_AGENT_PREFIX: &'static str = "cad11d00";

#[cfg(target_arch = "wasm32")]
const PIKE_ORG_PREFIX: &'static str = "cad11d01";

cfg_if! {
    if #[cfg(target_arch = "wasm32")] {
        fn compute_agent_address(name: &str) -> String {
            let mut sha = Sha512::new();
            sha.input(name.as_bytes());

            String::from(PIKE_AGENT_PREFIX) + &sha.result_str()[..62].to_string()
        }

        fn compute_org_address(name: &str) -> String {
            let mut sha = Sha512::new();
            sha.input(name.as_bytes());

            String::from(PIKE_ORG_PREFIX) + &sha.result_str()[..62].to_string()
        }

        fn compute_smart_permission_address(org_id: &str, name: &str) -> String {
            let mut sha_org_id = Sha512::new();
            sha_org_id.input(org_id.as_bytes());

            let mut sha_name = Sha512::new();
            sha_name.input(name.as_bytes());

            String::from(SMART_PERMISSION_PREFIX)
                + &sha_org_id.result_str()[..6].to_string()
                + &sha_name.result_str()[..58].to_string()
        }
    }
}


const FAMILY_NAME: &str = "hamlet_loyalty";
const ASSET: &str = "ae";
const ACCOUNT: &str = "ac";
const PROPERTY: &str = "ea";
const PROPOSAL: &str = "aa";
const RECORD: &str = "ec";
const RECORD_TYPE: &str = "ee";
const HOLDING: &str = "ho";
const OFFER: &str = "of";

pub fn get_hamlet_prefix() -> String {
    let mut sha = Sha512::new();
    sha.input_str(&FAMILY_NAME);
    sha.result_str()[..6].to_string()
}

pub fn hash(to_hash: &str, num: usize) -> String {
    let mut sha = Sha512::new();
    sha.input_str(to_hash);
    let temp = sha.result_str().to_string();
    let hash = match temp.get(..num) {
        Some(x) => x,
        None => "",
    };
    hash.to_string()
}

pub fn make_asset_address(asset_name: &str) -> String {
    get_hamlet_prefix() + &ASSET + &hash(asset_name, 62)
}

pub fn make_account_address(identifier: &str) -> String {
    get_hamlet_prefix() + &ACCOUNT + &hash(identifier, 62)
}
pub fn make_holding_address(holding_id: &str) -> String {
    get_hamlet_prefix() + &HOLDING + &hash(holding_id, 62)
}
pub fn make_offer_address(offer_id: &str) -> String {
    get_hamlet_prefix() + &OFFER + &hash(offer_id, 62)
}
pub fn make_record_address(record_id: &str) -> String {
    get_hamlet_prefix() + &RECORD + &hash(record_id, 62)
}

pub fn make_record_type_address(type_name: &str) -> String {
    get_hamlet_prefix() + &RECORD_TYPE + &hash(type_name, 62)
}

pub fn make_property_address(record_id: &str, property_name: &str, page: u32) -> String {
    make_property_address_range(record_id) + &hash(property_name, 22) + &num_to_page_number(page)
}

pub fn make_property_address_range(record_id: &str) -> String {
    get_hamlet_prefix() + &PROPERTY + &hash(record_id, 36)
}

pub fn num_to_page_number(page: u32) -> String {
    format!("{:01$x}", page, 4)
}

pub fn make_proposal_address(record_id: &str, agent_id: &str) -> String {
    get_hamlet_prefix() + PROPOSAL + &hash(record_id, 36) + &hash(agent_id, 26)
}