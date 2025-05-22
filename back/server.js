"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todos_1 = __importDefault(require("./Routes/todos"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use(express_1.default.json());
app.use('/api/todos', todos_1.default);
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI não está definida");
}
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    var _a;
    console.log("Conectado ao MongoDB");
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
})
    .catch(err => console.error("Erro na conexão com MongoDB:", err));
