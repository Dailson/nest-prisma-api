import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    // AUTOMAPPER CONFIGURATION
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    ArticleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
