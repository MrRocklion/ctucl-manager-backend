import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validateUser(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    async login(user: any) {
        const payload = { sub: user.id, username: user.username };
        const token =   await this.jwtService.sign(payload)
        return {
            access_token:token
        };
    }
    
}
