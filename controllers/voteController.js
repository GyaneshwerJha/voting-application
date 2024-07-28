const Vote = require('../models/Vote');
const Candidate = require("../models/Candidate");
const Election = require('../models/Election');
const User = require('../models/User');

async function getCurrentElection() {
    const currentElection = await Election.findOne({ isActive: true });
    if (!currentElection) {
        throw new Error('No active election found');
    }
    return currentElection._id;
}
exports.voteForCandidate = async (req, res) => {
    try {
        const { candidateId } = req.body;
        const { id: userId } = req.user;

        // Ensure the candidate exists
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        // Check if the user has already voted
        const existingVote = await Vote.findOne({ user: userId });
        if (existingVote) {
            return res.status(400).json({ message: 'Already voted' });
        }

        // Record the Vote
        const vote = new Vote({
            user: userId,
            candidate: candidateId
        })


        // Update the candidate's vote count
        candidate.voteCount++;
        await candidate.save();

        // Get the current election ID
        const currentElectionId = await getCurrentElection();
        console.log(currentElectionId);
        // Update the user's voting history
        await User.findByIdAndUpdate(userId, {
            $push: {
                votingHistory: {
                    electionId: currentElectionId,
                    candidateId: candidateId
                }
            }
        });

        await vote.save();

        res.status(201).json({ message: 'Vote cast successfully' })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error while voting' })
    }
}