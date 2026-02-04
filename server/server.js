const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");
const { authRouter } = require("./routes/authRoute");
const { sessionRouter } = require("./routes/sessionRoute");
const { questionRouter } = require("./routes/questionRoute");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
require("dotenv").config();

const app = express();

//middleware fro cors
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDb();

app.use(express.json());

//routes
app.use("/api/auth",authRouter);
app.use("/api/session",sessionRouter);
app.use("/api/question",questionRouter);

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);


app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

app.get("/",(req,res) => res.send("Hello, API is live"));

const PORT = process.env.PORT || 4400;
app.listen(PORT,() => {console.log(`Server is running on PORT:${PORT}`)});
