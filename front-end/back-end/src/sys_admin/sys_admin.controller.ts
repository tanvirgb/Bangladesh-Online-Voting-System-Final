import { Body, Controller, Delete, ForbiddenException, Get, 
        Param, 
        Patch, Post, Put, Res, Session, UploadedFile, UseGuards, 
        UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Sys_AdminService } from "./sys_admin.service";
import { Voters } from "./entities/voters.entity";
import { Candidates } from "./entities/candidates.entity";
import { Sys_Admin } from "./entities/sys_admin.entity";
import { Centers } from "./entities/centers.entity";
import { Reports } from "./entities/reports.entity";
import { Candidate_Delete_Request } from "./entities/candidate_delete_request.entity";
import { Voting_Polls } from "./entities/voting_polls.entity";
import { Political_Parties } from "./entities/political_parties.entity";
import { LoginDTO, Change_PassDTO, Verify_UsernameDTO, Update_ProfileDTO, Verify_CenterDTO,
        Center_IdDTO, Party_IdDTO, Update_PartiesDTO, Update_CandidatesDTO, Update_CenterDTO } from "./sys_admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { JwtSessionGuard } from "./session.guard";
import * as jwt from 'jsonwebtoken';

@Controller('/sys_admin')
export class Sys_AdminController{
    constructor(private readonly Sys_AdminService: Sys_AdminService) {}

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDTO: LoginDTO): Promise<Sys_Admin | string | { access_token: string }> {
        try {
            const { username, password } = loginDTO;
            const response = await this.Sys_AdminService.login(username, password);
            
            if (typeof response === 'string') {
                return response;
            } else {
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    // Change Password
    @Patch('/change_pass')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    async change_pass(@Body() change_passDTO: Change_PassDTO): Promise<Sys_Admin | string> {
        try {
            return this.Sys_AdminService.change_pass(change_passDTO.username, change_passDTO.old_pass, change_passDTO.new_pass);
        } catch (error) {
            throw error;
        }
    }

    // View User (System Adminstrator) Profile
    @Post('/view_profile')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    async view_profile(@Body() verify_usernameDTO: Verify_UsernameDTO): Promise<Sys_Admin | string> {
        try {
            return this.Sys_AdminService.view_profile(verify_usernameDTO.username);
        } catch (error) {
            throw error;
        }      
    }

    // Update User (System Adminstrator) Profile
    @Patch('/update_profile')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('image', { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage:diskStorage ({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }))
    async update_profile(@Body() update_profileDTO: Update_ProfileDTO, @UploadedFile() image?: Express.Multer.File): Promise<Sys_Admin | string> {
        try {
            if (update_profileDTO.password) {
                throw new ForbiddenException ("Cannot Update Password");
            }
            return this.Sys_AdminService.update_profile(update_profileDTO.username, update_profileDTO, image);
        } catch (error) {
            throw error;
        }
    }

    // View All Voters
    @Get('/view_voters')
    @UseGuards(JwtSessionGuard)
    async view_voters(): Promise<Omit<Voters, 'password'>[] | string> {
        try {
            return this.Sys_AdminService.view_voters();
        } catch (error) {
            throw error;
        }
    }

    // Search a Voter using Username
    @Post('/search_voter')
    @UseGuards(JwtSessionGuard)
    async search_voter(@Body() verify_usernameDTO: Verify_UsernameDTO): Promise<Voters | string> {
        try {
            const { username } = verify_usernameDTO;
            return this.Sys_AdminService.search_voter(username);
        } catch (error) {
            throw error;
        }
    }

    // View All Candidates
    @Get('/view_candidates')
    @UseGuards(JwtSessionGuard)
    async view_candidates(): Promise<Omit<Candidates, 'password'>[] | string> {
        try {
            return this.Sys_AdminService.view_candidates();
        } catch (error) {
            throw error;
        }
    }

    // Search a Candidate using Username
    @Post('/search_candidates')
    @UseGuards(JwtSessionGuard)
    async search_candidates(@Body() verify_usernameDTO: Verify_UsernameDTO): Promise<Candidates | string> {
        try {
            const { username } = verify_usernameDTO;
            return this.Sys_AdminService.search_candidates(username);
        } catch (error) {
            throw error;
        }
    }

    // Update a Candidate Profile
    @Patch('/update_candidates')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('image', { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage:diskStorage ({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }))
    async update_candidates(@Body() update_candidatesDTO: Update_CandidatesDTO, @UploadedFile() image?: Express.Multer.File): Promise<Candidates | string> {
        try {
            if (update_candidatesDTO.password) {
                throw new ForbiddenException ("Cannot Update Password of a Candidate");
            }
            return this.Sys_AdminService.update_candidates(update_candidatesDTO.username, update_candidatesDTO, image);
        } catch (error) {
            throw error;
        }    
    }

    // Delete a Candidate Profile
    @Post('/delete_candidate')
    @UseGuards(JwtSessionGuard)
    async delete_candidate(@Body() verify_usernameDTO: Verify_UsernameDTO): Promise<Candidates | string> {
        try {
            const { username } = verify_usernameDTO;
            return this.Sys_AdminService.delete_candidate(username);
        } catch (error) {
            throw error;
        }
    }

    // View All Candidate Delete Requests
    @Get('/view_request')
    @UseGuards(JwtSessionGuard)
    async view_request(): Promise<Candidate_Delete_Request[] | string> {
        try {
            return this.Sys_AdminService.view_request();
        } catch (error) {
            throw error;
        }
    }

    // View All Political Parties
    @Get('/view_parties')
    @UseGuards(JwtSessionGuard)
    async view_parties(): Promise<Political_Parties[] | string> {
        try {
            return this.Sys_AdminService.view_parties();
        } catch (error) {
            throw error;
        }
    }

    // Search a Political Party's Information using Party ID
    @Post('/search_parties')
    @UseGuards(JwtSessionGuard)
    async search_parties(@Body() party_idDTO: Party_IdDTO): Promise<Political_Parties | string> {
        try {
            const { party_id } = party_idDTO;
            return this.Sys_AdminService.search_parties(party_id);
        } catch (error) {
            throw error;
        }
    }

    // Update a Political Party's Information using Party ID
    @Patch('/update_parties')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    async update_parties(@Body() update_partiesDTO: Update_PartiesDTO): Promise<Political_Parties | string> {
        try {
            return this.Sys_AdminService.update_parties(update_partiesDTO.party_id, update_partiesDTO);
        } catch (error) {
            throw error;
        }
    }

    // View All Voting Polls
    @Get('/view_polls')
    @UseGuards(JwtSessionGuard)
    async view_polls(): Promise<Voting_Polls[] | string> {
        try {
            return this.Sys_AdminService.view_polls();
        } catch (error) {
            throw error;
        }
    }

    // Add a Voting Center
    @Post('/add_center')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    async add_center(@Body() verify_centerDTO: Verify_CenterDTO): Promise<Centers[] | string> {
        try {
            return this.Sys_AdminService.add_center(verify_centerDTO.center_id, verify_centerDTO);
        } catch (error) {
            throw error;
        }
    }
    
    // View All Vote Centers
    @Get('/view_centers')
    @UseGuards(JwtSessionGuard)
    async view_centers(): Promise<Centers[] | string> {
        try {
            return this.Sys_AdminService.view_centers();
        } catch (error) {
            throw error;
        }
    }

    // Search a Vote Center using Center ID
    @Post('/search_center')
    @UseGuards(JwtSessionGuard)
    async search_center(@Body() center_idDTO: Center_IdDTO): Promise<Centers | string> {
        try {
            const { center_id } = center_idDTO;
            return this.Sys_AdminService.search_center(center_id);
        } catch (error) {
            throw error;
        }
    }

    // Update a Vote Center Information using Center ID
    @Patch('/update_center')
    @UseGuards(JwtSessionGuard)
    @UsePipes(new ValidationPipe())
    async update_center(@Body() update_centerDTO: Update_CenterDTO): Promise<Centers | string> {
        try {
            return this.Sys_AdminService.update_center(update_centerDTO.center_id, update_centerDTO);
        } catch (error) {
            throw error;
        }
    }

    // Remove a Voting Center using Cneter ID
    @Post('/delete_center')
    @UseGuards(JwtSessionGuard)
    async delete_center(@Body() center_idDTO: Center_IdDTO): Promise<Centers | string> {
        try {
            const { center_id } = center_idDTO;
            return this.Sys_AdminService.delete_center(center_id);
        } catch (error) {
            throw error;
        }
    }

    // View All Reports
    @Get('/view_reports')
    @UseGuards(JwtSessionGuard)
    async view_reports(): Promise<Reports[] | string> {
        try {
            return this.Sys_AdminService.view_reports();
        } catch (error) {
            throw error;
        }
    }

    //Logout
    @Delete('/logout')
    @UseGuards(JwtSessionGuard)
    async logout(@Session() session): Promise<string> {
        try {
            session.destroy((error: any) => {
                if (error) {
                    throw error;
                }
            });
        
            return "Log Out Successful!!";
            } catch (error) {
                throw error;
        }
    }

    // Fetch Images
    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }
}