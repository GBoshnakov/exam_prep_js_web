const Post = require('../models/Post');

async function createNewPost(post) {
    const result = new Post(post);
    await result.save();

    return result;
}

async function getPosts() {
    return Post.find({}).populate('author', 'firstName lastName');
}

async function getPostById(id) {
    const post = Post.findById(id).populate('author', 'firstName lastName').populate('votes', 'email');

    return post;
}

async function getOwnerPosts(owner) {
    const posts = Post.find({author: owner});

    return posts;
}

async function voteById(postId, userId, value) {
    const post = await Post.findById(postId);

    if (post.author == userId) {
        throw new Error('Post owner cannot vote for own posts');
    }
    if (post.votes.includes(userId)) {
        throw new Error('User has already voted');
    }

    post.votes.push(userId);
    post.rating += value;

    await post.save();
}

async function editPostById(id, post) {
    const existing = await Post.findById(id);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.date = post.date;
    existing.image = post.image;
    existing.description = post.description;

    await existing.save();
}

async function deleteById(id) {
    await Post.findByIdAndDelete(id);
}

module.exports = {
    getPosts,
    createNewPost,
    getPostById,
    editPostById,
    deleteById,
    getOwnerPosts,
    voteById
}