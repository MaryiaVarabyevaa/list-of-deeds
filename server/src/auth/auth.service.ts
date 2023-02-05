import * as bcrypt from 'bcrypt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findUser(email);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid email or password',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        let comparedPassword = bcrypt.compareSync(pass, user.password);

        if (!comparedPassword) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid email or password',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        if (user && comparedPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async registration(userDto: CreateUserDto) {
        const { nickname, email, password } = userDto;
        const checkedUser = await this.userService.checkUserInSystem(nickname, email);

        if (checkedUser) {
            let comparedPassword = bcrypt.compareSync(password, checkedUser.password);
            if (comparedPassword) {
                const token = await this.login({
                    email: checkedUser.email,
                    id:checkedUser._id
                });
                return token;
            }
        }

        const user = await this.userService.findUser(email);

        if (user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'User with such email already exists',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const checkedNickname = await this.userService.checkByNickname([nickname]);

        if (checkedNickname) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'User with such nickname already exists',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await this.userService.create({
            nickname,
            email,
            password: hashPassword
        });

        const token = await this.login({
            email: newUser.email,
            id: newUser._id
        });
        return token;
    }
}