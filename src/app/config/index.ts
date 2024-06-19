import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_routes: process.env.BCRYPT_SALT_ROUTES,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
