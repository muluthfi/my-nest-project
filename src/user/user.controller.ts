import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() body: {username: string; password: string}) {
        return this.userService.create(body.username, body.password);
    }

    @Post('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile() {
        return {message: 'Authorized User'};
    }
}