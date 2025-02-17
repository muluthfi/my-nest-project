import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userService } from '../user/user.service';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: userService) {}

    async validateUser(username:string, pass: string) {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: any){
        const payload = {username: user.username, sub: user.id};
        return{
            access_token: this.jwtService.sign(payload),    
        }
    }
}