import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async findByUsername(username: string) {
        return this.userRepo.findOne({where: {username}});
    }

    async create(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({username, password: hashedPassword});
        return this.userRepo.save(user);
    }
}