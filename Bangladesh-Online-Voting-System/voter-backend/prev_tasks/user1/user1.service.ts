import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User1Entity } from './user1.entity'; 

@Injectable()
export class User1Service {
  constructor(@InjectRepository(User1Entity) private user1Repository: Repository<User1Entity>) {}
  //Create
  async createUser(user: User1Entity): Promise<User1Entity> {
    console.log(user);
    return this.user1Repository.save(user);
    }

  //Update status
  async updateUserStatus(userId: any, newStatus: string): Promise<User1Entity> {
    // Update user status using query
    const result: UpdateResult = await this.user1Repository
        .createQueryBuilder()
        .update(User1Entity)
        .set({ status: newStatus })
        .where("id = :id", { id: userId })
        .execute();

    // If no user was updated, throw a NotFoundException
    if (result.affected === 0) {
        throw new NotFoundException('User not found');
    }

    // Fetch and return the updated user
    return await this.user1Repository.findOne(userId);
}

  //Get inactive users
  async getInactiveUsers(): Promise<User1Entity[]> {
    return await this.user1Repository.createQueryBuilder('user')
        .where('user.status = :status', { status: 'inactive' })
        .getMany();
}

  //Get users age>40
  async getUsersOver40(): Promise<User1Entity[]> {
    return await this.user1Repository.createQueryBuilder('user')
        .where('user.age > :age', { age: 40 })
        .getMany();
}
}
