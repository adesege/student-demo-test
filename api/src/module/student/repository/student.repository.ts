import { EntityRepository, Repository } from 'typeorm';
import { Student } from '../models/student.model';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
