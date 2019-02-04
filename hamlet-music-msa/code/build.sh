set -ex

export CARGO_INCREMENTAL=0

cargo +nightly build --target wasm32-unknown-unknown --release

wasm-bindgen \
  ./target/wasm32-unknown-unknown/release/hamlet-music-msa.wasm --out-dir ./build
