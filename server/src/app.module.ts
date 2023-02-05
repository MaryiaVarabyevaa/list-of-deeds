import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://userdb:2xNkI1fTQ82WZRFA@cluster0.25bayjt.mongodb.net/?retryWrites=true&w=majority'),
      UserModule,
      AuthModule,
      ListModule,
      FriendsModule,
  ],

})
export class AppModule {}
