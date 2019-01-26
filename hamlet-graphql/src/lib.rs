#![feature(decl_macro, proc_macro_hygiene, custom_attribute)]

#[macro_use] extern crate juniper;
#[macro_use] extern crate serde_derive;

extern crate reqwest;
extern crate serde;
extern crate serde_json;
extern crate actix;
extern crate actix_web;
extern crate env_logger;
extern crate futures;

pub mod schema;
