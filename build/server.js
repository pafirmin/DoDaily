"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./db"));
const users_1 = __importDefault(require("./routes/users"));
const folders_1 = __importDefault(require("./routes/folders"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(cors_1.default({
    origin: [
        'http://localhost:3000',
        'https://peaceful-fortress-47523.herokuapp.com/*',
    ],
    credentials: true,
}));
app.use(helmet_1.default());
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
db_1.default();
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/folders', folders_1.default);
app.use('/api/tasks', tasks_1.default);
const root = path_1.default.join(__dirname, '..', 'client', 'build');
app.use(express_1.default.static(root));
app.get('*', (_req, res) => {
    res.sendFile('index.html', { root });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
