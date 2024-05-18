import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  
    addname(): object {
        return {message: "Welcome !"};
      }
}
