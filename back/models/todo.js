"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    duedate: {
        type: Date,
        validate: {
            validator: (value) => !value || value >= new Date(),
        },
        message: "A data de entrega não pode estar no passado",
    },
});
todoSchema.virtual("diasRestantes").get(function () {
    if (!this.duedate)
        return null;
    const hoje = new Date();
    const diffms = this.duedate.getTime() - hoje.getTime();
    const diffdias = Math.ceil(diffms / (1000 * 60 * 60 * 24));
    return diffdias;
});
todoSchema.set("toJSON", { virtuals: true });
const Todo = mongoose_1.default.model("Todo", todoSchema);
exports.default = Todo;
