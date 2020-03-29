const grpcListing = require('./grpcListing.js');
const protoLoader = require('@grpc/proto-loader');

// const PROTO_PATH = 'proto/notes.proto';
const PROTO_PATH =
  'https://gist.githubusercontent.com/de314/8e37975c925efe6352fa7aa0f82a958b/raw';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

console.log(JSON.stringify(grpcListing(packageDefinition), null, 2));
