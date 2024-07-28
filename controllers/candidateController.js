const Candidate = require('../models/Candidate');

exports.createCandidate = async (req, res) => {
    try {
        const { name, party, manifesto } = req.body;
        const candidate = new Candidate({
            name,
            party,
            manifesto
        })

        await candidate.save();
        res.status(201).json({ message: 'Candidate created successfully' })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create candidate' });
    }
}

exports.getCandidate = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get all the candidates' })
    }
}

exports.updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, party, manifesto } = req.body;
        const candidate = await Candidate.findByIdAndUpdate(id, { name, party, manifesto }, { new: true });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update candidate' })
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const candidate = await Candidate.findByIdAndDelete(id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete candidate' });
    }
}

