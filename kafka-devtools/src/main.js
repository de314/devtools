const grpc = require('grpc');
const uuid = require('uuid/v4');
const notesProto = grpc.load('proto/notes.proto');

const dummyNote = id => ({
  id: `${id}`,
  title: `Note ${id}`,
  content: `Content ${id}`,
});
const NOTES = {
  '1': dummyNote(1),
  '2': dummyNote(2),
};

const server = new grpc.Server();
server.addService(notesProto.NoteService.service, {
  delete: (call, callback) => {
    const note = NOTES[call.request.id];
    if (!!note) {
      delete NOTES[call.request.id];
      callback(null, note);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not Found',
      });
    }
  },
  insert: (call, callback) => {
    const note = call.request;
    note.id = uuid();
    console.log(note);
    NOTES[note.id] = note;
    callback(null, note);
  },
  list: (_, callback) => callback(null, Object.values(NOTES)),
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051');
server.start();
