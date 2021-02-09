"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const FolderSchema = new Schema({
    name: {
        type: String,
        Required: true,
    },
    tasks: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'task',
        },
    ],
    notes: [
        {
            type: String,
        },
    ],
    users: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'user',
        },
    ],
});
exports.default = mongoose_1.default.model('folder', FolderSchema);
