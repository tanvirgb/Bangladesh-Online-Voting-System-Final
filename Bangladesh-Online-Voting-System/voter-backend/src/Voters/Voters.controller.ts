import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes,ValidationPipe} from "@nestjs/common";
import { VotersService } from "./Voters.service";
import { VotersEntity } from "./Voters.entity";
import { ConfirmationDTO, CreateIssueDto, GetCentersDto, LoginDTO, SearchCandidateByPartialNameDto, SearchPoliticalPartyByPartialNameDto, UpdateUserDTO, VoteDto, VotersDTO, usernameDTO } from "./Voters.dto";
import { CandidatesEntity } from "./Candidates.entity";
import { PoliticalPartyEntity } from "./PoliticalParty.entity";
import { CentersEntity } from "./Centers.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from "./auth.gaurd";


@Controller('/voters')
export class VotersController{
    constructor(private readonly votersService: VotersService) {}
    
   //Login 
   @Post('/login')
   async login(@Session() session, @Body() loginDto: LoginDTO): Promise<any> {
     try {
      session.username = loginDto.username; // Store username in session
      return this.votersService.login(loginDto.username, loginDto.password);
       // Log session value
        
     } catch (error) {
       throw new UnauthorizedException(error.message);
     }
   }

   //Registration 
   @Post('/register')
   @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe())
    async createVoter(@Body() voterDTO: VotersDTO, @UploadedFile() image: Express.Multer.File): Promise<VotersEntity> {
      return this.votersService.createVoter(voterDTO, image);
    }
  @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })}

   //View Profile 
   @Post('/profile')
   //@UseGuards(AuthGuard)
  async getProfileByUsername(@Body() un:usernameDTO) {
  try {
    const username = un.username; // Access stored username from session
    if (!username) {
      throw new BadRequestException('Username is required');
    }
    const voter = await this.votersService.getProfileByUsername(username);
    return { voter };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    throw new BadRequestException('Invalid request');
  }
}

   //Update Profile 
   @Post('/update')
   //@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(@Session() session, @Body() updateUserDto: UpdateUserDTO): Promise<any> {
    try {
      const username = session.username; // Access stored username from session
      if (!username) {
        throw new BadRequestException('Username is required');
      }

      // Perform update operation using the username
      const user = await this.votersService.updateByUsername(username, updateUserDto);
      
      // Update successful message
      return { message: "Updated Successfully!" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        // User not found
        return { message: error.message };
      }
      throw error; // Throw other errors
    }
  }
   // Delete Profile 
  @Delete('/delete')
  //@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async deleteUser(@Session() session, @Body() body: ConfirmationDTO): Promise<any> {
  if (!body.confirmation) {
    throw new BadRequestException('Confirmation not provided');
  }

  const username = session.username; // Get username from session

  try {
    const user = await this.votersService.checkusername(username);
    
    // If confirmation is true, delete the user
    if (body.confirmation === true) {
      await this.votersService.deleteUser(username);
      return { message: 'User deleted successfully' };
    }
    
    // If confirmation is not true, return a confirmation message
    return { message: 'Confirm deletion of user', user };
  } catch (error) {
    if (error instanceof NotFoundException) {
      return { message: error.message };
    }
  }
  }

   //View all registered candidates 
   @Get('/viewallc')
   async getCandidates(): Promise<CandidatesEntity[]> {
     return this.votersService.getCandidates();
   }
   //View registered candidate’s details 
   @Get('/viewallcd')
   async getCandidatesDetails(): Promise<CandidatesEntity[]> {
     return this.votersService.getCandidatesDetails();
   }
   //Search for candidates 
   @Post('/searchc')
   @UsePipes(new ValidationPipe())
  async searchCandidatesByPartialName(@Query() searchDto: SearchCandidateByPartialNameDto) {
    try {
      if (!searchDto.Name) {
        throw new BadRequestException('Name is required');
      }
      
      const candidates = await this.votersService.searchCandidatesByPartialName(searchDto.Name);
      return { candidates };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Invalid request');
    }
  }
   //Search for political parties 
   
  @Post('/searchp')
  @UsePipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )
  async searchPoliticalPartiesByPartialName(@Query() searchDto: SearchPoliticalPartyByPartialNameDto) {
    if (!searchDto || !searchDto.Name) {
      throw new BadRequestException('Name is required');
    }

    try {
      const politicalParties = await this.votersService.searchPoliticalPartiesByPartialName(searchDto.Name);
      return { politicalParties };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }


   //View all political parties 
   @Get('/viewallp')
   async getPoliticalPartyDetails(): Promise<PoliticalPartyEntity[]> {
     return this.votersService.getPoliticalPartyDetails();
   }
   //View vote count of candidates 

   //Vote for candidates 
   @Post('/vote')
   //@UseGuards(SessionGuard)
   @UsePipes(new ValidationPipe())
   async vote( @Query() voteDto: VoteDto){
      const { candidateId,username } = voteDto;

      // Call the recordVote method from the service
      return this.votersService.recordVote(candidateId, username);
   }
   //View predictive wins 

   /// Report issues
  @Post('/complaint')
  //@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async createComplaint( @Body() createIssueDto: CreateIssueDto) {
    try {
    const { issue } = createIssueDto;
    const {username} = createIssueDto; // Get username from session

    // Ensure a valid username is present in the session
    if (!username) {
      throw new UnauthorizedException('Unauthorized access');
    }

    await this.votersService.writeComplaint(username, issue);
    return { message: 'Complaint submitted successfully' };
  } catch (error) {
    throw new BadRequestException('Failed to submit complaint');
  }
}

   //Show voting center  
   @Get('/viewcenters')
   async getcenters(): Promise<CentersEntity[]> {
     return this.votersService.getcenters();
   }
   

   //Logout 
   @Post('/logout')
   //@UseGuards(SessionGuard)
  async destroySession(@Session() session): Promise<{ message: string }> {
    try {
      if (!session) {
        throw new BadRequestException('Session not found');
      }
      
      session.destroy((error: any) => {
        if (error) {
          throw new Error('Failed to destroy session');
        }
      });
      console.log('Logout:', session.username);
      return { message: 'Logout successfully' };
      
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
  
  //show voting poll
  @Get('/votingpoll')
  async getVotes(): Promise<{ vote_count: number; username: string; location: string }[]> {
    return this.votersService.getVotes();
  }

  //show voting poll
  @Get('/prediction')
  async showwins(): Promise<{ prediction: number; username: string }[]> {
    return this.votersService.showwins();
  }

  @Get('/selectcenter')
  async getCenters(@Body() body: GetCentersDto): Promise<CentersEntity[]> {
    const { location } = body;
    return this.votersService.getCentersByLocation(location);
  }
}



