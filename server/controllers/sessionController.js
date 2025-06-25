const Question = require("../models/Question");
const Session = require("../models/Session");


exports.createSession = async (req,res) => {
    try {
        const {role,experience,topicsToFocus,description,questions} = req.body;
        const userId = req.user.id;

        const session = await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async(q) => {
                const question = await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        return res.status(200).json({success:true,message:"Session created successfully",session});
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getMySession = async(req,res) => {
    try {
        const session = await Session.find({user: req.user.id}).sort({createdAt:-1}).populate("questions");
        return res.status(200).json({success:true,message:"Session fetched successfully",session});
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getSessionById = async(req,res) => {
    try {
        const session = await Session.find({_id: req.params.id}).populate({
            path:"questions",
            options: {sort:{isPinned:-1,createdAt:1}},
        }).exec();

        if(!session) {
            return res.status(400).json({
                success:false,
                message:"Session not found",
            });
        }

        return res.status(200).json({
            success:true,
            message:"Specific Session fetched successfully",
            session,
        });


    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteSession = async(req,res) => {
    try {
        const session = await Session.findById(req.params.id);
        if(!session) {
            return res.status(400).json({
                success:false,
                message:"Session not found",
            });
        }

        if(session.user.toString() !== req.user.id) {
            return res.status(400).json({
                success:false,
                message:"Not authorized to delete this session",
            });
        }

        await Question.deleteMany({session: session._id});
        await session.deleteOne();

        return res.status(200).json({
            success:true,
            message:"Session deleted successfully",
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}