import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ConfirmAccountRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsb2lzLnppbW1lcm1hbm40NUBnbWFpbC5jb20iLCJpYXQiOjE2NzkxMzQwMjEsImV4cCI6MTY3OTMwNjgyMX0.U_4-LPXp0Ar6y3Wn7VWP7LvbPqv87ikY4sGHDFvlNJ4"})
  token: string;
}
