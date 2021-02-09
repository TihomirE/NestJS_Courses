import { Module } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import { MongooseModule } from "@nestjs/mongoose"
import { MONGO_CONNECTION } from "./constants";
import { HttpExceptionFilter } from "./filters/http.filter";
import { APP_FILTER } from '@nestjs/core';

// TODO - for production move MONGO_CONNECTION to environment variable

@Module({
    imports: [
        CoursesModule,
        MongooseModule.forRoot(MONGO_CONNECTION)
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
          },
    ]
})
export class AppModule {

}
