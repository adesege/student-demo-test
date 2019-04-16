import express from 'express';
import { addStudent, editStudent, getStudents } from '../controllers/student';

const routes = express.Router();

routes.get('/', getStudents);
routes.post('/', addStudent);
routes.post('/edit/:studentId', editStudent);

export default routes;
