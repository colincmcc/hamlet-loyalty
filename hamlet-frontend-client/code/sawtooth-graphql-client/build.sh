cargo +nightly build --target wasm32-unknown-unknown --release

wasm-bindgen ./target/wasm32-unknown-unknown/release/iroha_graphql.wasm --out-dir ./www/graphql/