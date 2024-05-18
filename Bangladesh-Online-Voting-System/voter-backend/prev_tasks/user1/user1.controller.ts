import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, UsePipes,ValidationPipe} from "@nestjs/common";
import { User1Service } from "./user1.service";
import { User1DTO } from "./user1.dto";
import { User1Entity } from "./user1.entity";

@Controller('/user1')
export class User1Controller{
    constructor(private readonly user1Service: User1Service) {}
    
    @Post('/create')
    async createUser(@Body() user: User1Entity): Promise<User1Entity> {
      return this.user1Service.createUser(user);
    }

    @Get('/over40')
    async getUsersOver40() {
        return await this.user1Service.getUsersOver40();
    }

    @Get('/inactive')
    async getInactiveUsers() {
        return await this.user1Service.getInactiveUsers();
    }

    @Put('/:id/status')
    async updateUserStatus(
        @Param('id') userId: number,
        @Body('status') newStatus: string
    ) {
        const updatedUser = await this.user1Service.updateUserStatus(userId, newStatus);
        
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        
        return updatedUser;
    }
    
}



