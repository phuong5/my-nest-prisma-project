import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '.prisma/client';
import { UnauthorizedExceptionFilter } from 'src/filters/unauthorized-exception.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
// import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(): Promise<User[]> {
    console.log('UsersController findAll');
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpExceptionFilter();
    }
  }

  @Get(':id')
  @UseFilters(new UnauthorizedExceptionFilter())
  public findById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    console.log('UsersController findById');
    try {
      return this.usersService.findById(id);
    } catch (error) {
      throw new HttpExceptionFilter();
    }
  }

  @Post()
  public create(@Body() data: User): Promise<User> {
    return this.usersService.create(data);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<User | null> {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): Promise<User | null> {
    return this.usersService.delete(+id);
  }
}
