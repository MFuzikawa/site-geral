"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.json(todos);
    }
    catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, duedate } = req.body;
        const newTodo = new todo_1.default({ title, duedate });
        const savedTodo = yield newTodo.save();
        res.json(savedTodo);
        console.log("Corpo da requisição recebido no backend:", req.body);
    }
    catch (error) {
        console.error('Erro ao salvar tarefa:', error);
        res.status(500).json({ error: 'Erro interno ao salvar tarefa' });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, completed } = req.body;
        const updatedTodo = yield todo_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, (title !== undefined && { title })), (completed !== undefined && { completed })), { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json(updatedTodo);
    }
    catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar tarefa' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.json({ message: 'Tarefa removida' });
    }
    catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: 'Erro interno ao deletar tarefa' });
    }
});
exports.deleteTodo = deleteTodo;
