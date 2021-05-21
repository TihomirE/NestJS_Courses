import { IsString, IsArray } from 'class-validator';
import * as mongoose from 'mongoose';

export class User extends mongoose.Document {
  @IsString() email: string;
  @IsArray() roles: [];
  @IsString() passwordHash: string;
}