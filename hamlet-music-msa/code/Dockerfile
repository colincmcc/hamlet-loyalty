FROM colincmcc/rust-musl-builder as builder

WORKDIR /home/rust/

# TODO: Find method to install Rust dependencies without this step
# Avoid having to install/build all dependencies by copying
# the Cargo files and making a dummy src/main.rs
COPY Cargo.toml .
COPY Cargo.lock .
RUN echo "fn main() {}" > src/main.rs
RUN cargo test
RUN cargo build --release

# We need to touch our real main.rs file or else docker will use
# the cached one.
COPY . .
RUN sudo touch src/main.rs

RUN cargo test
RUN cargo build --release

# Size optimization
RUN strip target/x86_64-unknown-linux-musl/release/hamlet-music-msa

# Start building the final image
FROM scratch
WORKDIR /home/rust/
COPY --from=builder /home/rust/target/x86_64-unknown-linux-musl/release/hamlet-music-msa .
ENTRYPOINT ["./hamlet-music-msa"]