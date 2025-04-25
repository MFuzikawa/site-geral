import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
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
      validator: (value: Date) => !value || value >= new Date(), 
      },
      message: "A data de entrega não pode estar no passado",
    },
  },
);


todoSchema.virtual("diasRestantes").get(function (this: any) {
  if (!this.duedate) return null;
  const hoje = new Date();
  const diffms = this.duedate.getTime() - hoje.getTime();
  const diffdias = Math.ceil(diffms / (1000 * 60 * 60 * 24));
  return diffdias;
});


todoSchema.set("toJSON", { virtuals: true });


const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
