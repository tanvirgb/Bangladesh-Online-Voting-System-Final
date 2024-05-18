import { Module } from '@nestjs/common';
import { User1Controller } from './user1.controller';
import { User1Service } from './user1.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User1Entity } from './user1.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User1Entity]),],
  controllers: [User1Controller],
  providers: [User1Service],
})
export class User1Module {}
