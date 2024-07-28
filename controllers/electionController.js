const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');
const Election = require('../models/Election');

exports.createElection = async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;

        const existingElection = await Election.findOne({ name });
        if (existingElection) {
            return res.status(400).json({ message: 'An election with this name already exists.' });
        }

        // Optional: Check if an election with the same date range already exists
        const overlappingElection = await Election.findOne({
            $or: [
                { startDate: { $lt: endDate, $gte: startDate } },
                { endDate: { $lte: endDate, $gt: startDate } }
            ]
        });
        if (overlappingElection) {
            return res.status(400).json({ message: 'An election with overlapping dates already exists.' });
        }


        const election = new Election({
            name, startDate, endDate
        })
        await election.save();
        return res.status(200).json({ message: 'Election created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error creating election' });
    }
};



exports.getElectionResult = async (req, res) => {
    try {
        // Aggregate votes to count the number of votes per candidate
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: "$candidate",
                    voteCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "candidates",
                    localField: "_id",
                    foreignField: "_id",
                    as: "candidate"
                }
            },
            {
                $unwind: "$candidate"
            },
            {
                $project: {
                    _id: 0,
                    candidateId: "$candidate._id",
                    name: "$candidate.name",
                    voteCount: 1
                }
            },
            {
                $sort: { voteCount: -1 }
            }
        ]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Election results' });
    }
};
