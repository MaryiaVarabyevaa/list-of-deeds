import {Module} from '@nestjs/common';
import {ListService} from './list.service';
import {ListController} from './list.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {List, ListSchema} from "./schemas/list.schema";

@Module({
  providers: [ListService],
  controllers: [ListController],
  imports: [
    MongooseModule.forFeature([
      {
        name: List.name,
        schema: ListSchema
      }
    ]),
  ]
})
export class ListModule {}
