
Requirements
Windows Installation:
zeromq : https://github.com/zeromq/libzmq
openssl binaries : https://wiki.openssl.org/index.php/Binaries https://github.com/sfackler/rust-openssl#windows
protoc : https://github.com/protocolbuffers/protobuf/releases



Libzmq must be built from souce.  Follow steps in ./buildsteps/appveyor.bat


Example Variables
$Env:OPENSSL_DIR="C:\OpenSSL-Win64"
$Env:LIBZMQ_INCLUDE_DIR="C:\work\hamlet-loyalty\sawtooth-backend\hamlet-tp\deps\zmq\include"
$Env:LIBZMQ_PREFIX="C:\work\hamlet-loyalty\sawtooth-backend\hamlet-tp\deps\zmq"
$Env:LIBZMQ_LIB_DIR="C:\work\hamlet-loyalty\sawtooth-backend\hamlet-tp\deps\zmq\lib"

set OPENSSL_DIR=C:\OpenSSL-Win64
set LIBZMQ_PREFIX=C:\work\hamlet-loyalty\sawtooth-backend\hamlet-tp\deps\zmq

In case of DLL not found error: place the zmq dll directly in the build-script path
Might have to do this with both sawtooth-sdk and zmq
cargo +nighlty build