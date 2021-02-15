import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost): any {

        console.log("Http exception handler triggered", JSON.stringify(exception));

        // grab the context to get to the response & request objects
        const ctx = host.switchToHttp();
        const response = ctx.getResponse(), 
            request = ctx.getRequest(),
            statusCode = exception.getStatus();

        return response.status(statusCode).json({
            status: statusCode,
            createdBy: "HttpExceptionFilter",
            errorMessage: exception.message.message
        });
    }
}