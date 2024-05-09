import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    UserModule,

    // AUTOMAPPER CONFIGURATION
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
