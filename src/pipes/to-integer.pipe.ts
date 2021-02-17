import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ToIntegerPipe implements PipeTransform<string> {

    // pipes can be used for transformation as well as for validation as seen below
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value);

        if (isNaN(val)) {
            throw new BadRequestException('Conversion to number failed ' + value);
        }

        return val;
    }

}
