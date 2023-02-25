import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

function isTruthy(value: unknown): boolean {
  return value === true || value === 'true' || value === '1';
}

function required(envName: string) {
  const value = process.env[envName];
  if (!value) {
    throw new Error(`Missing required env variable: ${envName}`);
  }
  return value;
}

export const dbConfigs = {
  host: required('DB_HOST'),
  port: parseInt(required('DB_PORT'), 10) || 5432,
  username: required('DB_USER'),
  password: required('DB_PASSWORD'),
  database: required('DB_DATABASE'),
};

export const typeOrmConfigs: TypeOrmModuleOptions = {
  type: 'postgres',
  ...dbConfigs,
  autoLoadEntities: true,
  entities: ['**/entities/*.ts'],
  synchronize: true,
};

export const appConfig = registerAs('application', () => ({
  serverPort: parseInt(required('SERVER_PORT'), 10) || 3000,
  db: dbConfigs,
}));
