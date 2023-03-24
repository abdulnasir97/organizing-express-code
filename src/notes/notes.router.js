const express = require("express");
const router = express.Router();
const notesController = require("./notes.controller");

router.get("/:noteId", notesController.noteExists, notesController.read);
router.get("/", notesController.list);
router.post("/", notesController.hasText, notesController.create);
router.put("/:noteId", notesController.noteExists, notesController.hasText, notesController.update);
router.delete("/:noteId", notesController.noteExists, notesController.delete);

module.exports = router;