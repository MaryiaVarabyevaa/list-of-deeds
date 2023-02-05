import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://mongodb:27017/deedsList`),
      UserModule,
      AuthModule,
      ListModule,
      FriendsModule,
  ],

})
export class AppModule {}
