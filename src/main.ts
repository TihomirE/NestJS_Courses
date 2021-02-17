import { NestFactory } from "@nestjs/core";
import { Mongoose } from "mongoose";
import { AppModule } from "./app.module";
import { FallbackExceptionFilter } from "./filters/fallback.filter";
import { HttpExceptionFilter } from "./filters/http.filter";
import * as mongoose from 'mongoose';
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ValidationFilter } from "./filters/validation.filter";
import { ValidationException } from "./filters/validation.exception";

mongoose.set('useFindAndModify', false);


async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");
    // filter order is important, should be from most generic to most specific
    // using our custom created filter for whole app, but it can be used just for the controller or method as well
    app.useGlobalFilters(
        new FallbackExceptionFilter(),
        new HttpExceptionFilter(),
        new ValidationFilter()
        );

    app.useGlobalPipes(new ValidationPipe({
        // when creating/updating an object skip validation for missing properties (otherwise it would fail)
        skipMissingProperties: true,
        exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map(
                error => `${error.property} has wrong value ${error.value} 
                ${Object.values(error.constraints).join(', ')} `
            )

            return new ValidationException(messages);
        }
    }));

    await app.listen(9000);
}

bootstrap();
