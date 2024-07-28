const Feedback = require('../models/Feedback');

exports.provideFeedback = async (req, res) => {
    try {
        const { feedback } = req.body;
        const userId = req.user.id;

        const newFeedback = new Feedback({
            userId,
            feedback
        });

        await newFeedback.save();
        res.status(200).json({
            message: 'Feedback received, Thank you for you feedback'
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: 'Failed to submit feedback'
        })
    }
}

exports.getFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({ feedbacks })
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Feedback' })
    }
}