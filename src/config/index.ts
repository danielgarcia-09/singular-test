import 'dotenv/config';

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieName: process.env.JWT_COOKIE_NAME
}