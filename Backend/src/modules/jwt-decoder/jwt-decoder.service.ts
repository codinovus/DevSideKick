import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtDecoderService {
    private readonly logger = new Logger(JwtDecoderService.name);
    private readonly allowedAlgorithms: jwt.Algorithm[] = ['HS256', 'RS256']; // Specify allowed algorithms

    decodeToken(token: string): Record<string, any> {
        if (!token) {
            throw new BadRequestException('Token is required');
        }

        try {
            const decoded = jwt.decode(token, { complete: true }) as jwt.Jwt & { payload: JwtPayload };

            if (!decoded) {
                throw new BadRequestException('Invalid JWT format');
            }

            const isExpired = decoded.payload?.exp ? decoded.payload.exp * 1000 < Date.now() : null;

            return {
                header: decoded.header,
                payload: decoded.payload,
                signature: decoded.signature || 'No signature (possible unsigned token)',
                isExpired,
            };
        } catch (error) {
            // Type assertion for error
            const errorMessage = (error as Error).message || 'Error decoding JWT token';
            this.logger.error(`Error decoding JWT token: ${errorMessage}`);
            throw new BadRequestException(errorMessage);
        }
    }

    verifyToken(token: string, key: string): Record<string, any> {
        if (!token) {
            throw new BadRequestException('Token is required');
        }

        try {
            const decoded = jwt.decode(token, { complete: true }) as jwt.Jwt & { payload: JwtPayload };

            if (!decoded) {
                throw new BadRequestException('Invalid JWT format');
            }

            // Extract algorithm from header
            const algorithm = decoded.header.alg as jwt.Algorithm; // Cast to Algorithm type

            // Check if the algorithm is allowed
            if (!this.allowedAlgorithms.includes(algorithm)) {
                throw new UnauthorizedException(`Algorithm ${algorithm} is not allowed`);
            }

            // Verify signature
            return jwt.verify(token, key, { algorithms: [algorithm] }) as JwtPayload;
        } catch (error) {
            // Type assertion for error
            const errorMessage = (error as Error).message || 'Invalid or expired token';
            this.logger.error(`Invalid or expired token: ${errorMessage}`);
            throw new UnauthorizedException(errorMessage);
        }
    }
}