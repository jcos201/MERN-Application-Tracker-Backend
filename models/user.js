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
    application: [],
    savedJobSearch: [],
})

const applicationSchema = new Schema({
    companyName: String,
    jobTitle: String,
    dateApplied: Date,
    interviewDate: Date,
    contactName: String,
    notes: [],
});

const jobSearch = new Schema({
    companyName: String,
    jobTitle: String,
    location: String,
})