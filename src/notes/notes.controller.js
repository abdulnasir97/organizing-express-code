const notes = require("../data/notes-data");

const noteExists = (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    req.foundNote = foundNote;
    return next();
  } else {
    return next({
      status: 404,
      message: `Note id not found: ${req.params.noteId}`,
    });
  }
};

const hasText = (req, res, next) => {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  return next({ status: 400, message: "A 'text' property is required." });
};

const read = (req, res) => {
  res.json({ data: req.foundNote });
};

const list = (req, res) => {
  res.json({ data: notes });
};

const create = (req, res) => {
  const { data: { text } = {} } = req.body;

  const newNote = {
    id: notes.length + 1, // Assign the next ID
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
};

const update = (req, res) => {
  const { data: { text } = {} } = req.body;
  req.foundNote.text = text;
  res.json({ data: req.foundNote });
};

const remove = (req, res) => {
  const noteIndex = notes.indexOf(req.foundNote);
  notes.splice(noteIndex, 1);
  res.status(204).send();
};

module.exports = {
  read,
  list,
  create,
  update,
  delete:remove,
  noteExists,
  hasText,
};