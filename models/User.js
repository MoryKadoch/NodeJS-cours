const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstname: String,
    lastname: String,
})

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userSchema'
    }
})

const UserModel = model('User', userSchema);
const PostModel = model('Post', postSchema);


module.exports = {
    UserModel,
    PostModel
};