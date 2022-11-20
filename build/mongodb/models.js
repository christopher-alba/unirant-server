"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var schema_1 = require("./schema");
var mongoose_1 = __importDefault(require("mongoose"));
exports.User = mongoose_1.default.model("User", schema_1.userSchema);
