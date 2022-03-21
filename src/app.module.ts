import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PersonController } from './person/person.controller';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';

@Module({
  imports: [],
  controllers: [AppController, PersonController],
  providers: [AppService, PersonService],
})
export class AppModule {}
