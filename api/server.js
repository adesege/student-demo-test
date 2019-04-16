import express from 'express';
import routes from './routes';
import studentRoutes from './routes/student';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./client'));

app.use('api/students', studentRoutes);
app.use(routes);

app.listen(port, () => console.log('Server started on port %d', port));
