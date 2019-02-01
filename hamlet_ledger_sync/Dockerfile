
FROM ubuntu:bionic

LABEL "install-type"="mounted"

RUN apt-get update \
  && apt-get install gnupg -y

# Install Node and Ubuntu dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
  curl \
  ca-certificates \
  pkg-config \
  build-essential \
  libzmq3-dev \
  && curl -s -S -o /tmp/setup-node.sh https://deb.nodesource.com/setup_8.x \
  && chmod 755 /tmp/setup-node.sh \
  && /tmp/setup-node.sh \
  && apt-get install nodejs -y -q \
  && rm /tmp/setup-node.sh \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g prebuild-install

WORKDIR /hamlet-backend/ledger_sync/hamlet_ledger_sync/

COPY hamlet-backend/ledger_sync/hamlet_ledger_sync/package.json .
RUN npm install

COPY protos/ ../../protos/
COPY hamlet-backend/ledger_sync/hamlet_ledger_sync/ .

EXPOSE 3000/tcp

CMD ["/usr/bin/node", "src/index.js"]