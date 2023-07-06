import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public create(data: User): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  public update(id: number, data: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public delete(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
