const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: String,
    applications: [applicationSchema],
    savedJobSearches: [jobSearchSchema],
    timestamps: true,
});

const applicationSchema = new Schema({
    companyName: String,
    jobTitle: String,
    dateApplied: Date,
    interviewDate: Date,
    contactName: String,
    notes: [],
    timestamps: true,
});

const jobSearchSchema = new Schema({
    companyName: [{type: Schema.Types.ObjectId, ref: 'CompanyName'}],
    jobTitle: String,
    location: String,
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);