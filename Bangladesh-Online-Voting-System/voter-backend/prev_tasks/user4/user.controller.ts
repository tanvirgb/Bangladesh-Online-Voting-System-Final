import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes,ValidationPipe} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";

@Controller('/user4')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Post('/addname')
    @UsePipes(new ValidationPipe())
    addname(@Body() data:UserDTO):object {
        console.log(data);
        return this.userService.addname();
    }
}



