const client = require('./client.js');

client.list({}, (err, notes) => {
  if (!err) {
    console.log('successfully fetched List notes');
    console.log(notes);
  } else {
    console.error('Failed to fetch notes', err);
  }
});
