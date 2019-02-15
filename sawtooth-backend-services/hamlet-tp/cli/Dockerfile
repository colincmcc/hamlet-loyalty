FROM rustlang/rust:nightly

# Need sawtooth-sdk to create keys
RUN echo "deb http://repo.sawtooth.me/ubuntu/bumper/stable xenial universe" >> /etc/apt/sources.list \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8AA7AF1F1091A5FD \
  && apt-get update \
  && apt-get install -y -q \
  python3-sawtooth-sdk \
  python3-sawtooth-cli \
  unzip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y unzip libzmq3-dev

# For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
  && unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
  && rm protoc-3.5.1-linux-x86_64.zip

RUN apt-get update && apt-get install -y protobuf-compiler

WORKDIR /project/sawtooth-backend-services/hamlet-tp/cli/
ENV PATH=$PATH:/project/sawtooth-backend-services/hamlet-tp/cli/target/debug/