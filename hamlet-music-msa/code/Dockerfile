# -*- mode: dockerfile -*-
#
# An example Dockerfile showing how to build a Rust executable using this
# image, and deploy it with a tiny Alpine Linux container.

# Our first FROM statement declares the build environment.
FROM colincmcc/rust-musl-builder AS builder

# Add our source code.
ADD . ./

# Fix permissions on source code.
RUN sudo chown -R rust:rust /home/rust

RUN cargo install wasm-bindgen-cli
# Build our application.
RUN chmod +x ./build.sh
RUN ./build.sh

# Now, we need to build our _real_ Docker container, copying in `using-diesel`.
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder \
    /home/rust/src/target/x86_64-unknown-linux-musl/release/hamlet-music-msa \
    /usr/local/bin/
CMD /usr/local/bin/hamlet-music-msa