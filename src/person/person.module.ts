import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PostalCode } from './postal-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostalCode])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
