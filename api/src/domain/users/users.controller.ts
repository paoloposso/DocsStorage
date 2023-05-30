import { Body, Controller, Get, NotFoundException, Post, Query, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUsersService } from './users.service';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { IAuthService } from './auth.service';
import { JwtAuthGuard } from 'src/application/guards/jwt-auth-guard';
import { Role } from 'src/domain/users/role.enum';
import { Roles } from 'src/application/guards/roles-decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: IUsersService, 
        private readonly authService: IAuthService) {}

    @Get()
    @ApiNotFoundResponse({ description: 'User not found' })
    async getUserByEmail(@Query('email') email: string): Promise<User> {
        var result = await this.userService.findByEmail(email);
        if (!result) {
            throw new NotFoundException();
        }
        return result;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    createUser(@Body() userDto: User): Promise<any> {
        return this.userService.create(userDto);
    }

    @Post('authenticate')
    authenticate(@Body() 
        { email, plainTextPassword }: 
        { email: string; plainTextPassword: string; })
            : Promise<string> {
        return this.authService.authenticateUser({ email, plainTextPassword });
    }
}
