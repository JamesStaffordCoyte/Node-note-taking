const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

// modules that handles different commands
const notes = require('./notes.js');

let titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

let bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('lits', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
let command = argv._[0];

// Adds a give note to file
if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }

// Lists all notes
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    console.log("--");
    console.log(`Title: ${note.title} \nBody: ${note.body}`);
  });
// Reads a note
} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }


// Removes a given note
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? `${argv.title} was removed` : `${argv.title} was not found`;
  console.log(message);

} else {
  console.log('Command not recognized');
}
