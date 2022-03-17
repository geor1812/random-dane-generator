import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonController } from './person/person.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, PersonController],
  providers: [AppService],
})
export class AppModule {}
