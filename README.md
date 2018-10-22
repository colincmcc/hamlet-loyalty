<h1 align="center">
Hamlet Loyalty
</h1>

<h3 align="center">
Loyalty framework for the community.
</h3>

<h3 align="center">
This readme is under heavy development. Email [me](mailto:hamlet@colinmac.me) for any immediate questions
</h3>


## Overview

* **Easy to deploy.** It is expensive and technically difficult for small businesses to run a loyalty program.  Hamlet is an open source solution that allows a community to work together, to establish an effective loyalty program.
* **Trustless infrastructure.** Built on IBM's Sawtooth blockchain infrastructure.  Allows for multiple businesses or organizations to operate on a single loyalty network, without a central administrator.
* **Offer a more valuable loyalty program.** Loyalty programs are normally ineffective, due to the difficulty of redeeming points or complexity of earning them.  With Hamlet, there is an optional exchange program, where members can exchange loyatly points amongst eachother, increasing the value of your points and promoting a greater point redemption rate.
* **Integrated product tracking.** Track the products that your loyal customers are buying the most.  Gear individual customer redemption offers based off of past purchasing context.


Hamlet Loyalty is based off of IBM's [Sawtooth](https://https://sawtooth.hyperledger.org) project, which is part of the [Hyperledger Framework](https://www.hyperledger.org/).

## Installation and usage

Hamlet requires [Node.js](https://nodejs.org/) v6 or more recent.
[Yarn package manager](https://yarnpkg.com/) is also recommended.

Hamlet is split into 3 main layers:
* **Sawtooth** provides a modular blockchain framework.  It allows for plugable consensus methods and transaction processors.  Hamlet uses two transaction processors to read and write data to the blockchain.  Read more on Sawtooth here: https://sawtooth.hyperledger.org/docs/core/nightly/master/
* **RethinkDB** is a JSON database, that syncs with the Sawtooth blockchain.  It allows for complex queries and authentication for the Hamlet application.
* **Hamlet Frontend** is a React application that uses a managed graphQL server to interact with the Sawtooth transaction processors and RethinkDb.  The graphQL server is managed via AWS Appsync, which allows for offline capabilites and high availability.

### Configuring your environment

#### Protocol Buffers
Hamlet uses Googles protocol buffers to serialize and deserialize data.

**More details coming soon!**

#### Kubernetes
Hamlet uses Kubernetes to manage the RethinkDB and Sawtooth containers.  This guide expects you to have a functional cluster running on AWS.  There is a cluster template than can be setup through [kops](https://github.com/kubernetes/kops) in `/kubernetes-configs/kops-cluster.yaml`.  I recommend you also install the [Kubernetes Dashboard](https://github.com/kubernetes/dashboard).  Then run the `setup.yaml` file located in the same folder.

**More details coming soon!**
