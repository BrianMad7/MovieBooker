import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from 'src/user/login.dto';
import { RegisterDto } from 'src/user/register.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login function'})
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto);
    }

    // Création du register : 
    // https://docs.nestjs.com/security/encryption-and-hashing
    // https://docs.nestjs.com/techniques/database
    @ApiOperation({summary: 'Register function'})
    @Post('register')
    async register(@Body() RegisterDto: RegisterDto) {
        const user = await this.authService.register(RegisterDto);
        const { password, ...cleanUser } = user;
        return cleanUser;
    }
}
