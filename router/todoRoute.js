import express from 'express' 
import { createTodo, getTodos,deleteTodo,updateTodo} from '../controller/todoController.js'
import { authUser } from '../middlewares/auth.js'

const todoRouter = express.Router()

todoRouter.get("/getTodos",authUser,getTodos)
todoRouter.post("/createTodo",authUser,createTodo)
todoRouter.put("/updateTodo/:id",authUser,updateTodo)
todoRouter.delete('/deleteTodo/:id',authUser,deleteTodo)

export default todoRouter
