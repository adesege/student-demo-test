import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from '../services/services.module';
import { StudentController } from './controllers/student/student.controller';
import { Student } from './models/student.model';
import { StudentRepository } from './repository/student.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentRepository]),
    ServicesModule,
  ],
  controllers: [StudentController],
})
export class StudentModule {}
