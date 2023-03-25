"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = exports.Community = exports.Profile = void 0;
var schema_1 = require("./schema");
var mongoose_1 = __importDefault(require("mongoose"));
exports.Profile = mongoose_1.default.model("Profile", schema_1.profileSchema);
exports.Community = mongoose_1.default.model("Community", schema_1.communitySchema);
exports.Post = mongoose_1.default.model("Post", schema_1.postSchema);
exports.Comment = mongoose_1.default.model("Comment", schema_1.commentSchema);
