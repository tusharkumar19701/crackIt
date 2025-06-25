const express = require("express");
const { createSession, getMySession, getSessionById, deleteSession } = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

const sessionRouter = express.Router();

sessionRouter.post("/create",protect,createSession);
sessionRouter.get("/my-sessions",protect,getMySession);
sessionRouter.get("/:id",protect,getSessionById);
sessionRouter.delete("/:id",protect,deleteSession);

module.exports = {sessionRouter};