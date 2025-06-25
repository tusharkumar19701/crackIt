const Question = require("../models/Question");
const Session = require("../models/Session");


exports.addQuestionsToSession = async(req,res) => {
    try {
        const {sessionId,questions} = req.body;
        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({success:false,message:"Invalid input data"});
        }

        const session = await Session.findById(sessionId);
        if(!session) {return res.status(500).json({success:false,message:"Session not found"});}

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session:sessionId,
                question:q.question,
                answer:q.answer,
            }))
        );

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        return res.status(200).json({success:true,message:"Questions added to session",createdQuestions});

    } catch(error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

exports.togglePinQuestion = async(req,res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) {return res.status(400).json({success:false,message:"Question not found"});}

        question.isPinned = !question.isPinned;
        await question.save();
        return res.status(200).json({success:true,message:"Toggled successfully",question});

    } catch(error) {
        return res.status(500).json({success:false,message:error.message});
    }
}

exports.updateQuestionNote = async(req,res) => {
    try {
        const {note} = req.body;

        const question = await Question.findById(req.params.id);

        if(!question) {return res.status(500).json({success:false,message:"Question not found"});}
        question.note = note || "";
        await question.save();
        return res.status(200).json({success:true,message:"Notes updated successfully",question});

    } catch(error) {
        return res.status(500).json({success:false,message:error.message});
    }
}