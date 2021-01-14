const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const applicationSchema = new Schema({
    companyName: [{type: Schema.Types.ObjectId, ref: 'CompanyName'}],
    jobTitle: String,
    dateApplied: Date,
    interviewDate: Date,
    contactName: String,
    notes: String,
}, {timestamps: true}
);

const jobSearchSchema = new Schema({
    companyName: String,
    jobTitle: String,
    city: String,
    state1: String,
}, {timestamps: true}
);

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: String,
    applications: [applicationSchema],
    savedJobSearches: [jobSearchSchema],
}, { timestamps: true }
);

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    console.log('inside pre')
    if(!user.isModified("password")) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    })
});

userSchema.methods.comparePassword = function(tryPassword, callback) {
    bcrypt.compare(tryPassword, this.password, callback)
}

module.exports = mongoose.model('User', userSchema);