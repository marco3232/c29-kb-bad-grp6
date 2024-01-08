import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export const env = {
  PORT: 8090,
  NODE_ENV: 'development',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  TEST_DB_HOST: 'localhost',
  TEST_DB_PORT: 5432,
  TEST_DB_NAME: '',
  TEST_DB_USERNAME: '',
  TEST_DB_PASSWORD: '',
}

populateEnv(env, { mode: 'halt' })
