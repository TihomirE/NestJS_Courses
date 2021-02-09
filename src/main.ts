import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http.filter";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");
    // using our custom created filter for whole app, but it can be used just for the controller or method as well
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(9000);
}

bootstrap();
