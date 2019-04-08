import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformPaginationQueryPipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  transform(value: any, metadata: ArgumentMetadata) {
    let newValue = value;
    if (metadata.type === 'query' && (value.limit || value.page)) {
      const limit = parseInt(value.limit, 10) || 10;
      const page = parseInt(value.page, 10) || 1;
      const offset = page > 1 ? limit * (page - 1) : 0;
      newValue = { limit, page, offset };
    }
    return newValue;
  }
}
