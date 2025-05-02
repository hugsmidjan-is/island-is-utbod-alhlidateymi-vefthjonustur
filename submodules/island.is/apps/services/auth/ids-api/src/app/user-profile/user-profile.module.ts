import { Module } from '@nestjs/common'

import { NationalRegistryClientModule } from '@island.is/clients/national-registry-v2'
import { NationalRegistryV3ClientModule } from '@island.is/clients/national-registry-v3'
import { CompanyRegistryClientModule } from '@island.is/clients/rsk/company-registry'
import { UserProfileClientModule } from '@island.is/clients/user-profile'
import { FeatureFlagModule } from '@island.is/nest/feature-flags'

import { UserProfileController } from './user-profile.controller'
import { UserProfileService } from './user-profile.service'

@Module({
  imports: [
    NationalRegistryClientModule,
    NationalRegistryV3ClientModule,
    UserProfileClientModule,
    CompanyRegistryClientModule,
    FeatureFlagModule,
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
