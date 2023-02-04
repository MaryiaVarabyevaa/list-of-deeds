import {Module} from '@nestjs/common';
import {FriendsService} from './friends.service';
import {FriendsController} from './friends.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Friends, FriendsSchema} from "./schemas/friends.schema";

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Friends.name,
        schema: FriendsSchema
      }
    ]),
  ]
})
export class FriendsModule {}
