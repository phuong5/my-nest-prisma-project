import { IsString } from 'class-validator';
import { IsEmail, IsRequired, MaxLength, Unique } from 'src/validators/validation';

export class UserDto {
  @IsEmail()
  @IsRequired()
  @Unique('user')
  email: string;

  @IsString()
  @MaxLength(25)
  @IsRequired()
  username: string;

  @IsString()
  @IsRequired()
  password: string;
}
