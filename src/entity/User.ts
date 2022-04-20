import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
    id: string;
  
  @Column()
    user: string;

  @Column()
    password: string;

  @Column()
    hint: string;
}