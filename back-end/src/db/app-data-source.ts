import { DataSource } from 'typeorm';
import config from '../config/config';

const AppDataSource = new DataSource({
  host: config.database.databaseHost,
  port: config.database.databasePort,
  username: config.database.databaseUsername,
  password: config.database.databasePassword,
  database: config.database.databaseName,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}']
});

export default AppDataSource;
