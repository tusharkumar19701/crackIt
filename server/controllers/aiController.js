const { GoogleGenAI } = require("@google/genai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  questionAnswerPrompt,
  conceptExplainPrompt,
} = require("../utils/prompts");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function main(prompt) {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({
        success: false,
        message: "Missing fields required",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    let rawText = await main(prompt);

    //Removing ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove the first ```json
      .replace(/```(?=[^`]*$)/, "") // Remove the last ```
      .trim();

    const data = JSON.parse(cleanedText);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to generate explanation" });
    }

    const prompt = conceptExplainPrompt(question);

    let rawText = await main(prompt);
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // Remove the first ```json
      .replace(/```(?=[^`]*$)/, "") // Remove the last ```
      .trim();

    const data = JSON.parse(cleanedText);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

module.exports = { generateConceptExplanation, generateInterviewQuestions };
