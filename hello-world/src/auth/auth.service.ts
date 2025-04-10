import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/user/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/login.dto';
import { isMACAddress } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(RegisterDto: RegisterDto): Promise<User> {
    const { email, username, password, birthdate } = RegisterDto;

    const existing = await this.userRepository.findOne({
        where: [{ email }, { username }],
      });

      if (existing) {
        throw new BadRequestException('Email or username already used');
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        email,
        username,
        password: hash,
        birthdate
      });
  
      return this.userRepository.save(user)

  }

  async login(LoginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password} = LoginDto;
    const user: User | null = await this.userRepository.findOneBy({email});
    if (!user) {
      throw new BadRequestException('No user found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { id: user.id, email: user.email };

    return {
        access_token: await this.jwtService.signAsync(payload),
      };
  }
}