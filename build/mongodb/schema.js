"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.postSchema = exports.communitySchema = exports.profileSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.profileSchema = new mongoose_1.default.Schema({
    displayName: String,
    profilePicture: String,
    wallpaper: String,
    email: String,
    username: {
        type: String,
        unique: true,
    },
    emailVerified: Boolean,
    communitiesMember: {
        type: [
            {
                type: String,
            },
        ],
        required: false,
    },
    communitiesAdmin: {
        type: [
            {
                type: String,
            },
        ],
        required: false,
    },
    posts: {
        type: [
            {
                type: String,
            },
        ],
        required: false,
    },
    comments: {
        type: [
            {
                type: String,
            },
        ],
        required: false,
    },
});
exports.communitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    adminIDs: { type: [String], required: false },
    creationDate: { type: Date, default: Date.now },
    memberIDs: { type: [String], required: false },
    postIDs: { type: [String], required: false },
    wallpaper: {
        type: String,
        default: function () {
            return "https://picsum.photos/2000/3000?random=".concat(Math.random() * Number.MAX_VALUE);
        },
    },
});
exports.postSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    profileID: String,
    userID: String,
    likes: Number,
    dislikes: Number,
    images: [String],
    creationDate: { type: Date, default: Date.now },
    commentIDs: [String],
});
exports.commentSchema = new mongoose_1.default.Schema({
    comment: String,
    creationDate: { type: Date, default: Date.now },
    likes: Number,
    dislikes: Number,
    isImage: Boolean,
    userID: String,
    profileID: String,
});
