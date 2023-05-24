const { Schema, default: mongoose } = require('mongoose');

//jobs schema
const jobsSchema = new Schema({
    company: {
        type: String,
        required: [true, 'provide company name'],
        maxlength: 50
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Job', jobsSchema);