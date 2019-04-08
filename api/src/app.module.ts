import {
  ClassSerializerInterceptor,
  Module,
  MulterModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  ConfigModule,
  DatabaseModule,
  ServicesModule,
  StudentModule,
} from './module';
import { TransformPaginationQueryPipe } from './pipe';

@Module({
  imports: [
    MulterModule.register(),
    StudentModule,
    ServicesModule,
    DatabaseModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: TransformPaginationQueryPipe,
    },
  ],
})
export class AppModule {}
