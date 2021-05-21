import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { UsersSchema } from "./users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UsersSchema}
        ])
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {

}