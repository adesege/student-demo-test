import { Module } from '@nestjs/common';
import { AssetManagerService, TypeOrmConfigService } from './';

@Module({
  exports: [TypeOrmConfigService, AssetManagerService],
  providers: [TypeOrmConfigService, AssetManagerService],
})
export class ServicesModule {}
