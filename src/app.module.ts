import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CoursesModule } from "./courses/courses.module";
import { MongooseModule } from "@nestjs/mongoose"
import { MONGO_CONNECTION } from "./constants";
import { HttpExceptionFilter } from "./filters/http.filter";
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from "./auth/auth.module";
import { GetUserMiddleware } from "./middleware/get-user.middleware";
import { CoursesController } from "./courses/controllers/courses.controller";
import { LessonsController } from "./courses/controllers/lessons.controller";

// TODO - for production move MONGO_CONNECTION to environment variable

@Module({
    imports: [
        CoursesModule,
        AuthModule,
        MongooseModule.forRoot(MONGO_CONNECTION)
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
          },
    ]
})

//implementing NestModule in order to use/plug-in the middleware
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): void {
        // here the middleware chain is configured (middleware is executed in a chain so the order mathers!)
        
        consumer
            .apply(GetUserMiddleware)
            .forRoutes(
                CoursesController,
                LessonsController
            )
    }

}
