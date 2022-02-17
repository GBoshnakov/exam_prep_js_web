const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO
async function register(username, password) {
    const existing = await getUserByUsername(username);
    if (existing) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        hashedPassword
    });
    await user.save();

    return user;
}

//TODO
async function login(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return user;
}

//TODO
async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

    return user;
}

module.exports = {
    register,
    login
}