import { Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    @ApiNotFoundResponse({ description: 'User not found' })
    async getUserByEmail(@Query('email') email: string): Promise<User> {
        var result = await this.service.findByEmail(email);

        if (!result) {
            throw new NotFoundException();
        }

        return result;
    }

    @Post()
    public createUser(@Body() userDto: User): Promise<string> {
        return this.service.create(userDto);
    }
}
