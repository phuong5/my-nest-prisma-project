import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("ValidationPipe trigger")
        return value;
    }
}

@Injectable()
export class IDPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("IDPipe: ", value)
        if (!value) {
            throw new BadRequestException('Value is not valid');
        }
        return value;
    }
}