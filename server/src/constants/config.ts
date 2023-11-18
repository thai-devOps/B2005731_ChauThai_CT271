import dotenv from 'dotenv'

dotenv.config()

const envConfig = {
  PORT: process.env.PORT || 3000,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME || 'boarding_house',
  DB_USERS_COLLECTION: process.env.DB_USERS_COLLECTION || 'users',
  DB_REFRESH_TOKENS_COLLECTION: process.env.DB_REFRESH_TOKENS_COLLECTION || 'refresh_tokens',
  DB_ROOMS_COLLECTION: process.env.DB_ROOMS_COLLECTION || 'rooms',
  DB_NOTIFIES_COLLECTION: process.env.DB_NOTIFIES_COLLECTION || 'notifies',
  DB_UTILITIES_COLLECTION: process.env.DB_UTILITIES_COLLECTION || 'utilities',
  DB_BOOKINGS_COLLECTION: process.env.DB_BOOKINGS_COLLECTION || 'bookings',
  PASSWORD_SECRET: process.env.PASSWORD_SECRET || '',
  JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN || '',
  JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN || '',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || ''
}
export default envConfig
