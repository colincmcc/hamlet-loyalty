
FROM rust:latest

RUN apt-get update && apt-get install -y unzip libzmq3-dev

# For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
  && unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
  && rm protoc-3.5.1-linux-x86_64.zip
RUN apt-get update && apt-get install -y protobuf-compiler

# Build TP with dummy source in order to cache dependencies in Docker image.
# Make sure not to use the `volumes` command to overwrite:
#   - /sawtooth-supply-chain/processor/target/
#   - /sawtooth-supply-chain/processor/src/messages/
WORKDIR /project/sawtooth-backend-services/hamlet-tp/processor

WORKDIR /hamlet-loyalty/sawtooth-backend/hamlet-tp/code
COPY ./protos ./protos
COPY ./src ./src

COPY build.rs Cargo.toml Cargo.lock* ./
RUN cargo build

ENV PATH=$PATH:/hamlet-loyalty/sawtooth-backend/hamlet-tp/code/target/debug/

ENTRYPOINT ["/hamlet-loyalty/sawtooth-backend/hamlet-tp/code/target/debug/bin_hamlet"]
