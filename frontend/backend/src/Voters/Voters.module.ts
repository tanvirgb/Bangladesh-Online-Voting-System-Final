import { Module } from '@nestjs/common';
import { VotersService } from './Voters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotersEntity} from './Voters.entity';
import { VotersController } from './Voters.controller';
import { CandidatesEntity } from './Candidates.entity';
import { CentersEntity } from './Centers.entity';
import { ReportsEntity } from './Reports.entity';
import { VotingPollEntity } from './VotingPoll.entity';
import { PoliticalPartyEntity } from './PoliticalParty.entity';
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [TypeOrmModule.forFeature([VotersEntity,CandidatesEntity,CentersEntity,ReportsEntity,VotingPollEntity,PoliticalPartyEntity]),
  MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'kaziramisasamiha@gmail.com',
    pass: 'aoqs rkps ulaw kydt'
    },
    }
    }),JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),],
  controllers: [VotersController],
  providers: [VotersService],
  
})
export class VotersModule {}
