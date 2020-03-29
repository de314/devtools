const client = require('./client.js');

client.delete({ id: '1' }, (err, note) => {
  if (!err) {
    console.log('Successfully deleted note');
    console.log(note);
  } else {
    console.error('Failed to delete note', err);
  }
});
