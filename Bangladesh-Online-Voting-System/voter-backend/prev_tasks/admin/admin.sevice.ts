import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getUsers(): object {
    return {message: "hello admin Ramisa"};
  }
  getUsersById(id: string): object {
    return {message: "Your id is: " + id};
  }
  getUsersByNameAndId( name: string,  id: string) : object {
    return {message: "Your name is: " + name + " " + "Your id is: " + id}
  }
  adduser(myobj:object) : object{
    return  myobj;
  }
  updateName(myobj:object,id: string ) : object{
    return {myobj,id} ;
  }
}
