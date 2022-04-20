import { createHash } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
    id: string;
  
  @Column()
    user: string;

  @Column()
    password: string;

  @Column({ nullable: true })
    hint: string;

  @BeforeInsert()
  beforeInsertPassword() {
    this.password = createHash('sha256').update(this.password).digest('base64');
  }
}