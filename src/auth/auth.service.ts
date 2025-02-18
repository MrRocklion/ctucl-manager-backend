import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { ValidateUserDto } from 'src/users/dto/validate-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,private readonly usersService: UsersService) {}



    async login(user: LoginDto) {        
        const userValid:ValidateUserDto = await this.usersService.validateUser(user);
        if(userValid.exists){
            const isValid = await bcrypt.compare(user.password, userValid.data.password);
            if (!isValid) {
                return {
                    access: false,
                    access_token:'',
                    data:{}
                };
              }
    
            const token =   await this.jwtService.sign(user)
            return {
                access: true,
                access_token:token,
                data:userValid.data
            };
        }
    }
    
}
