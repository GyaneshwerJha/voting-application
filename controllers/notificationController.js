const Notification = require('../models/Notification');

exports.getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({
            date: -1
        })
        res.status(200).json({ notifications })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to get notification' });
    }
};


exports.createNotification = async (req, res) => {
    try {
        const { message } = req.body;
        const newNotification = new Notification({ message });
        await newNotification.save();
        res.status(200).json({ message: 'Notification created successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Failed to create notification' })
    }
}