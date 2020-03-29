const grpc = require('grpc');
const { NoteService } = grpc.load('proto/notes.proto');
const client = new NoteService(
  '127.0.0.1:50051',
  grpc.credentials.createInsecure(),
);

module.exports = client;
