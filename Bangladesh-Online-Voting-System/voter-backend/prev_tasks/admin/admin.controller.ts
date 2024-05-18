import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AdminService } from "./admin.sevice";

@Controller('/admin')
export class AdminController{
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getUsers(): object {
    return this.adminService.getUsers();
  } 
  @Get('/users/:id')
  getUsersById(@Param() id: string) : object {
    return this.adminService.getUsersById(id);
   }

   @Get('users/')
  getUsersByNameAndId(@Query('name') name: string, @Query('id') id: string) : object {
    return this.adminService.getUsersByNameAndId(name,id);
   }
   @Post('adduser')
   adduser(@Body() myobj: Object) {
    return this.adminService.adduser(myobj);
   }
   @Put('adduser/:id')
   updateName(@Body() myobj: Object,@Param() id: string): object {
    return this.adminService.updateName(myobj, id);
   }

}
    