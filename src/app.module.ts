import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { RolesGuard } from './auth/guard/role.guard';
import { FileModule } from './file/file.module';
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
    FileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
