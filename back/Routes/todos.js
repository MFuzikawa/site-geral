"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todocontrollers_1 = require("../controllers/todocontrollers");
const router = express_1.default.Router();
// Buscar todas tarefas
router.get('/', todocontrollers_1.getTodos);
/// Criar uma nova tarefa
router.post('/', todocontrollers_1.createTodo);
// Atualizar uma tarefa
router.put('/:id', todocontrollers_1.updateTodo);
// Deletar uma tarefa
router.delete('/:id', todocontrollers_1.deleteTodo);
exports.default = router;
