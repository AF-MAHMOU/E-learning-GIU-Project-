import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() userDto: any) {
        return this.usersService.createUser(userDto);
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    }
}
