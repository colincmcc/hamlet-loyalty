FROM ubuntu:bionic

ENV RUST_VERSION=1.32.0

RUN apt-get update \
  && apt-get install -y \
  curl \
  gcc \
  libssl-dev \
  libzmq3-dev \
  pkg-config \
  unzip

RUN \
  if [ ! -z $HTTP_PROXY ] && [ -z $http_proxy ]; then \
  http_proxy=$HTTP_PROXY; \
  fi; \
  if [ ! -z $HTTPS_PROXY ] && [ -z $https_proxy ]; then \
  https_proxy=$HTTPS_PROXY; \
  fi; \
  if [ ! -z $http_proxy ]; then \
  http_proxy_host=$(printf $http_proxy | sed 's|http.*://\(.*\):\(.*\)$|\1|');\
  http_proxy_port=$(printf $http_proxy | sed 's|http.*://\(.*\):\(.*\)$|\2|');\
  mkdir -p $HOME/.cargo \
  && echo "[http]" >> $HOME/.cargo/config \
  && echo 'proxy = "'$http_proxy_host:$http_proxy_port'"' >> $HOME/.cargo/config \
  && cat $HOME/.cargo/config; \
  fi;

# For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
  && unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
  && rm protoc-3.5.1-linux-x86_64.zip

RUN curl https://sh.rustup.rs -sSf > /usr/bin/rustup-init \
  && chmod +x /usr/bin/rustup-init \
  && rustup-init -y

ENV PATH=$PATH:/protoc3/bin:/root/.cargo/bin \
  CARGO_INCREMENTAL=0

RUN rustup install nightly
#RUN curl -s https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly

ENV PATH=$PATH:/protoc3/bin:/root/.cargo/bin \
  CARGO_INCREMENTAL=0

COPY ./code/ .



CMD echo "\033[0;32m--- Building intkey-tp-rust ---\n\033[0m" \
  && cargo +nightly run
# && cargo build --release \
#  && cp ./target/release/intkey_rust ./bin/intkey_rust
