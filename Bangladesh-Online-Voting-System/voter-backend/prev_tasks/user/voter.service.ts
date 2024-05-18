import { Injectable } from '@nestjs/common';

@Injectable()
export class VoterService {
  
  getpage(): object {
    return {message: "Welcome Voter!"};
  }
  getUsers(un: string): object {
    return {message: "hello "+un};
  }
  getUsersByNameAndId( name: string,  id: string) : object {
    return {message: "Your name is: " + name + " " + "Your id is: " + id}
  }
  adduser(myobj:object) : object{
    return  myobj;
  }
  getun(myobj:object,un: string ) : object{
    return {myobj,un} ;
  }
  ChgPw(myobj:object,pw: string ) : object{
    return {myobj,pw} ;
  }
  deluser(myobj:object) : object{
    myobj=null;
    return {message: "Deleted Successfully!"};
  }

}
