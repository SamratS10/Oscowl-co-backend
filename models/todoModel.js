import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    // enum: ['low', 'medium', 'high'], // You can change this based on your needs
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    default: Date.now, // Default to the current date if not provided
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
