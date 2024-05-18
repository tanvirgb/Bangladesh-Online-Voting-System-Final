import { IsString,IsEmail,IsDate,IsUrl,IsPhoneNumber,NotContains, Matches, Length } from "class-validator";
export class UserDTO{
    @Matches(/^[^0-9]*$/, {message: 'Name cannot have any number'})
    name:string;

    @IsEmail({},{message: 'Invalid Email format'})
    @Length(30)
    email:string;

    @IsString()
    @NotContains('/^[^#,@,&,$]*$/', {message: 'Password cannot have special characters'})
    password:string;

    @IsDate()
    date:number;

    @IsUrl()
    url:string;

    @IsPhoneNumber()
    phone:number;
}