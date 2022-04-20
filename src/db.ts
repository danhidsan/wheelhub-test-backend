import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'wheelhub.db',
  entities: [User],
  synchronize: true,
});