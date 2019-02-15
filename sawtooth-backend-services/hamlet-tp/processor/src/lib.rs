#[macro_use]
extern crate cfg_if;
cfg_if! {
    if #[cfg(target_arch = "wasm32")] {
        extern crate sabre_sdk;
    } else {
        extern crate clap;
        extern crate crypto;
        #[macro_use] extern crate log;
        extern crate log4rs;
        extern crate sawtooth_sdk;

        pub mod handlers;
        pub mod protos;
        pub mod std_ext;
        pub mod hamlet_state;
        pub mod hamlet_handler;
        pub mod hamlet_payload;
    }
}

