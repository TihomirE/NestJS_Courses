import { Module } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import { MongooseModule } from "@nestjs/mongoose"
import { MONGO_CONNECTION } from "./constants";

// TODO - for production move MONGO_CONNECTION to environment variable

@Module({
    imports: [
        CoursesModule,
        MongooseModule.forRoot(MONGO_CONNECTION)
    ]
})
export class AppModule {

}
