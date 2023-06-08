import express from 'express'
import { addBoard, deleteTodoTask, getBoards, getCategory, getCategory1, getCategory2, home, postCategory,deleteDoingTask,deleteDoneTask } from '../controllers/home.js';

const router=express.Router();
router.get('/',home)
router.post('/addBoard',addBoard)
router.get('/getBoards',getBoards)
router.post('/postCategory/:id',postCategory)
router.get('/getCategory/todo/:id',getCategory)
router.get('/getCategory/doing/:id',getCategory1)
router.get('/getCategory/done/:id',getCategory2)
router.post('/deleteTask/todo',deleteTodoTask)
router.post('/deleteTask/doing',deleteDoingTask)
router.post('/deleteTask/done',deleteDoneTask)
export default router;