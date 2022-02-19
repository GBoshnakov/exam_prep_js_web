const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO check model name and requirements
const postSchema = new Schema({
    title: { type: String, minlength: [6, 'Title must be at least 6 characters long'] },
    keyword: { type: String, minlength: [6, 'Keyword must be at least 6 characters long'] },
    location: { type: String, required: [true, 'Location is required'], maxlength: [15, 'Location must be no more than 15 characters long'] },
    date: {
        type: String,
        minlength: [10, 'Data must be 10 characters long'],
        maxlength: [10, 'Data must be 10 characters long']
    },
    image: { type: String, required: [true, 'Image is required'], match: [/^https?:\/\//, 'Image must be a valid URL address'] },
    description: { type: String, minlength: [8, 'Description must be at least 8 characters long'] },
    author: { type: ObjectId, ref: 'User', required: true },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 },

})


const Post = model('Post', postSchema);

module.exports = Post;