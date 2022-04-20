import { createHash } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
    id: string;
  
  @Column({ type: 'varchar' })
  @IsString()
    user: string;

  @Column({ type: 'varchar' })
  @IsString()
    password: string;

  @Column({ nullable: true })
    hint: string;

  @BeforeInsert()
  beforeInsertPassword() {
    this.password = createHash('sha256').update(this.password).digest('base64');
  }
}