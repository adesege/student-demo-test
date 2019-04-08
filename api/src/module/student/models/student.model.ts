import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { AbstractModel } from '../../../models';

@Entity()
export class Student extends AbstractModel {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;

  @Column({ type: 'text', array: true })
  hobbies: string[];

  @Column()
  photoUrl: string;

  constructor(partial: Partial<Student>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
