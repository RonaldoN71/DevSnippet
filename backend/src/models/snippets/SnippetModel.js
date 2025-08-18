import mongoose from 'mongoose';

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },

    code: {
        type: String,
        required: true,
        trim: true,
        default: "",
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    language: {
        type: String,
        default: "javaScript",
    },

    icon: {
        type: String,
        trim: true
    },

    likes: {
        type: Number,
        default: 0,
    },

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    bookmarkedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    
    isPublic: {
        type: Boolean,
        default: true,
    },

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",
            required: true,
        }
    ],
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },

},{timestamps: true});

const Snippet = mongoose.model("Snippet",SnippetSchema);

export default Snippet;