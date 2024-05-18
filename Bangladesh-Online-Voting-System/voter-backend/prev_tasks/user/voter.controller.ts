import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { VoterService } from "./voter.service";

@Controller('/voter')
export class VoterController{
    constructor(private readonly voterService: VoterService) {}

      @Get()
    getpage(): object {
    return this.voterService.getpage();
  } 
      @Get('user')
      getUsersByNameAndId(@Query('name') name: string, @Query('id') id: string) : object {
        return this.voterService.getUsersByNameAndId(name,id);
      }
      @Post('register')
      adduser(@Body() myobj: Object) {
        return this.voterService.adduser(myobj);
      }
      @Put('register/:username')
    getun(@Body() myobj: Object,@Param() un: string): object {
    return this.voterService.getun(myobj, un);
    }
     @Patch('register/:password')
    ChgPw(@Body() myobj: Object,@Param() pw: string): object {
    return this.voterService.ChgPw(myobj, pw);
    }
      @Delete('delete')
      deluser(@Body() myobj: Object) {
        return this.voterService.deluser(myobj);
      }

}