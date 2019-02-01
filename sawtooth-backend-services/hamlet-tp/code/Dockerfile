
FROM rust:1

RUN apt-get update && apt-get install -y unzip libzmq3-dev

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
fi; \
if [ ! -z $https_proxy ]; then \
https_proxy_host=$(printf $https_proxy | sed 's|http.*://\(.*\):\(.*\)$|\1|');\
https_proxy_port=$(printf $https_proxy | sed 's|http.*://\(.*\):\(.*\)$|\2|');\
mkdir -p $HOME/.cargo \
&& echo "[https]" >> $HOME/.cargo/config \
&& echo 'proxy = "'$https_proxy_host:$https_proxy_port'"' >> $HOME/.cargo/config \
&& cat $HOME/.cargo/config; \
fi;

  # For Building Protobufs
RUN curl -OLsS https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
&& unzip protoc-3.5.1-linux-x86_64.zip -d protoc3 \
&& rm protoc-3.5.1-linux-x86_64.zip
RUN apt-get update && apt-get install -y protobuf-compiler

  # Build TP with dummy source in order to cache dependencies in Docker image.
  # Make sure not to use the `volumes` command to overwrite:
  #   - /sawtooth-supply-chain/processor/target/
  #   - /sawtooth-supply-chain/processor/src/messages/
WORKDIR /hamlet-loyalty/sawtooth-backend/hamlet-tp/
RUN USER=root cargo new --bin code

WORKDIR /hamlet-loyalty/sawtooth-backend/hamlet-tp/code
COPY ./protos ./protos
COPY ./src ./src

COPY build.rs Cargo.toml Cargo.lock* ./
RUN cargo build

ENV PATH=$PATH:/hamlet-loyalty/sawtooth-backend/hamlet-tp/code/target/debug/

ENTRYPOINT ["/hamlet-loyalty/sawtooth-backend/hamlet-tp/code/target/debug/bin_hamlet"]
