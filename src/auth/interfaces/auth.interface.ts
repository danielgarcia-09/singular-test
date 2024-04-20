export interface JwtPayload {
    id: number;
    email: string;
    iat?: Date;
    exp?: Date;
}