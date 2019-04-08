import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileInterceptor,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiImplicitFile,
  ApiImplicitParam,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  getPublicId,
  mutlerConfigOptions,
  transformClassToPlain,
} from '../../../../helpers';
import { IPaginationQueryDTO } from '../../../../interfaces';
import { AssetManagerService } from '../../../services';
import { IMutlerFileResult, StudentDTO } from '../../interfaces';
import { Student } from '../../models/student.model';
import { StudentRepository } from '../../repository/student.repository';

@Controller('students')
@ApiUseTags('Students')
export class StudentController {
  constructor(
    private studentRepository: StudentRepository,
    private assetManagerService: AssetManagerService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('photo', mutlerConfigOptions))
  @ApiOperation({ title: 'Create student' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'photo',
    required: true,
    description: 'Student photo',
  })
  @ApiCreatedResponse({ description: 'Student has been successfully created.' })
  async createStudent(
    @Body() payload: StudentDTO,
    @UploadedFile() file: IMutlerFileResult,
  ) {
    if (!file) {
      throw new BadRequestException('Please upload a photo');
    }

    const uploadedFile = await this.assetManagerService.upload(file.buffer);

    return this.studentRepository.save({
      ...payload,
      photoUrl: uploadedFile.secure_url,
    });
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('photo', mutlerConfigOptions))
  @ApiOperation({ title: 'Update student' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'photo',
    required: true,
    description: 'Student photo',
  })
  @ApiOkResponse({ description: 'Student has been successfully updated.' })
  async partiallyUpdateStudent(
    @Body() payload: StudentDTO,
    @Param('id') studentId: string,
    @UploadedFile() file: IMutlerFileResult,
  ) {
    let newPayload: Student | StudentDTO = payload;

    if (file) {
      // Upload a new photo
      const uploadedFile = await this.assetManagerService.upload(file.buffer);
      newPayload = {
        ...payload,
        photoUrl: uploadedFile.secure_url,
      };

      // Remove the old photo
      const student = await this.studentRepository.findOne(studentId);

      if (student) {
        const publicId = getPublicId(student.photoUrl);

        // defer the execution so as not to block the request
        this.assetManagerService.delete(publicId);
      }
    }

    return this.studentRepository.save({ ...newPayload, id: studentId });
  }

  @Delete('/:id')
  @ApiImplicitParam({ name: 'id', required: true, type: 'uuid' })
  @ApiOkResponse({ description: 'Student has been successfully deleted.' })
  @ApiOperation({ title: 'Delete student' })
  async deleteStudent(@Param('id') studentId: string) {
    const student = await this.studentRepository.findOne(studentId);

    if (student) {
      const publicId = getPublicId(student.photoUrl);

      // defer the execution so as not to block the request
      this.assetManagerService.delete(publicId);
    }
    return this.studentRepository.delete(studentId);
  }

  @Get('/:studentId?')
  @ApiOperation({ title: 'Get student' })
  @ApiOkResponse({ description: 'Student loaded successfully' })
  @ApiImplicitParam({
    name: 'studentId',
    required: false,
    type: 'uuid',
    description: 'Optional studentId to get a particular student',
  })
  @ApiImplicitQuery({
    name: 'page',
    description: 'Current page',
    type: Number,
    required: false,
  })
  @ApiImplicitQuery({
    name: 'limit',
    description: 'Number of result per page',
    type: Number,
    required: false,
  })
  async getStudents(
    @Query() query: IPaginationQueryDTO,
    @Param('studentId') studentId: string,
  ) {
    const { offset, limit, page } = query;
    const [result, totalCount] = await this.studentRepository.findAndCount({
      skip: offset,
      take: limit,
      where: { id: studentId },
      order: { updatedAt: 'DESC' },
    });
    if (result.length === 0) {
      throw new HttpException('Student not found', 204);
    }
    return {
      students: transformClassToPlain(result),
      totalCount,
      page,
      limit,
    };
  }
}
