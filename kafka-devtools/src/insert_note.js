const client = require('./client.js');

const newNote = {
  title: 'New Note',
  content: 'New note content.',
};

client.insert(newNote, (err, note) => {
  if (!err) {
    console.log('New note created sucessfully');
    console.log(note);
  } else {
    console.error('Failed to create new note', err);
  }
});
