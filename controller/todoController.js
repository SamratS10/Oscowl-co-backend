import Todo from "../models/todoModel.js";



// Create a new Todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const newTodo = new Todo({
      title,
      description,
      priority,
      dueDate,
      completed,
    });

    await newTodo.save();
    return res.status(201).json({
      message: 'Todo created successfully!',
      todo: newTodo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating todo' });
  }
};

// Get all Todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching todos' });
  }
};

// // Get a single Todo by ID
// export const getTodoById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const todo = await Todo.findById(id);
//     if (!todo) {
//       return res.status(404).json({ message: 'Todo not found' });
//     }
//     res.status(200).json({ todo });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching todo' });
//   }
// };

// Update a Todo by ID
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, priority, dueDate, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({
      message: 'Todo updated successfully!',
      todo: updatedTodo,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete a Todo by ID
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json({ message: 'Todo deleted successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting todo' });
  }
};
