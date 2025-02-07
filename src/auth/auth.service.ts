import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/charging_points/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,private readonly usersService: UsersService) {}

    async validateUser(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    async login(user: LoginDto) {
        //const payload = { sub: user.id, username: user.username };

        const isValid = await bcrypt.compare(user.password, user.hashedPassword);

        const token =   await this.jwtService.sign(payload)
        return {
            access_token:token
        };
    }
    
}
