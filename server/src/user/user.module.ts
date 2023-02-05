import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {FriendsModule} from "../friends/friends.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
      MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema
        }
      ]),
      forwardRef(() => AuthModule),
      forwardRef(() => FriendsModule),
  ],
  exports: [UserService],
})
export class UserModule {}
