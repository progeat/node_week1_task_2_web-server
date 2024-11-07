const chalk = require('chalk');
const Note = require('./models/Note');

async function addNote(title, owner) {
  await Note.create({ title, owner });

  console.log(chalk.bgGreen('Note was added!'));
}

async function updateNote({ id, title }, owner) {
  const result = await Note.updateOne({ _id: id, owner }, { title });

  if (result.matchedCount === 0) {
    throw new Error('No note to edit');
  }

  console.log(chalk.bgYellow(`Note with id="${id}" has been updated.`));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

async function removeNote(id, owner) {
  const result = await Note.deleteOne({ _id: id, owner });

  if (result.matchedCount === 0) {
    throw new Error('No note to delete');
  }

  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

module.exports = {
  addNote,
  getNotes,
  updateNote,
  removeNote,
};
