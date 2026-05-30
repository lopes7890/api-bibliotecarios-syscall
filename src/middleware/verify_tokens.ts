import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const verifyTokens = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userId: number };
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
}