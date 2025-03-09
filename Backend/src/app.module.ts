import { LoremIpsumGenratorModule } from './modules/lorem-ipsum-genrator/lorem-ipsum-genrator.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtDecoderController } from './modules/jwt-decoder/jwt-decoder.controller';
import { JwtDecoderService } from './modules/jwt-decoder/jwt-decoder.service';
import { LoremIpsumGenratorController } from './modules/lorem-ipsum-genrator/lorem-ipsum-genrator.controller';
import { LoremIpsumGenratorService } from './modules/lorem-ipsum-genrator/lorem-ipsum-genrator.service';


@Module({
  imports: [AuthModule, UsersModule, AdminModule, LoremIpsumGenratorModule],
  controllers: [AppController, JwtDecoderController, LoremIpsumGenratorController],
  providers: [AppService, JwtDecoderService, LoremIpsumGenratorService],
})
export class AppModule {}
