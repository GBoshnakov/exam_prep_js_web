const { Schema, model } = require('mongoose');

const USERNAME_PATTERN = /^[a-zA-Z]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

//TODO check user schema requirements
const userSchema = new Schema({
    firstName: {
        type: String, minlength: [3, 'First name must be at least 3 characters long'], validate: {
            validator(value) {
                return USERNAME_PATTERN.test(value);
            },
            message: 'First name must contain English letters only'
        }
    },
    lastName: {
        type: String, minlength: [5, 'Last name must be at least 3 characters long'], validate: {
            validator(value) {
                return USERNAME_PATTERN.test(value);
            },
            message: 'Last name must contain English letters only'
        }
    },
    email: {type: String, required: [true, 'Email is required'], validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: 'Email must be valid and must contain English letters only'
    }},
    hashedPassword: { type: String, required: true }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;