function mapErrors(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message }));
    } else if (typeof error.message == 'string') {
        return [{ msg: error.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

function mapPost(post) {
    return {
        _id: post._id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        rating: post.rating,
        votes: post.votes.map(mapVotes),
        description: post.description,
        author: mapAuthor(post.author)
    }
}

function mapAuthor(author) {
    return {
        firstName: author.firstName,
        lastName: author.lastName,
        _id: author._id
    }
}

function mapVotes(user) {
    return {
        email: user.email,
        _id: user._id
    }
}

module.exports = {
    mapErrors,
    mapPost
};