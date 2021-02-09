"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const users_1 = __importDefault(require("./routes/users"));
const app = express_1.default();
app.use(express_1.default.json());
db_1.default();
const PORT = 5000;
app.use('/api/users', users_1.default);
app.listen(PORT, () => {
    `Server listening on port ${PORT}`;
});
