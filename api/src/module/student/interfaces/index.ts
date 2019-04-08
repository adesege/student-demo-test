import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class StudentDTO {
  @IsUUID()
  @IsOptional()
  @ApiModelPropertyOptional()
  @ApiModelProperty()
  readonly id?: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly birthDate: string;

  @IsNotEmpty({
    each: true,
  })
  @ApiModelProperty({ type: [String] })
  readonly hobbies: string[];
}

export interface IMutlerFileResult {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
