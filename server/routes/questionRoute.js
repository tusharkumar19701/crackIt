const express = require("express");
const { addQuestionsToSession, togglePinQuestion, updateQuestionNote } = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");

const questionRouter = express.Router();

questionRouter.post('/add',protect,addQuestionsToSession);
questionRouter.post("/:id/pin",protect,togglePinQuestion);
questionRouter.post("/:id/note",protect,updateQuestionNote);

module.exports = {questionRouter};