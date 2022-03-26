import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PostalCode } from './person/postal-code.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.default.host,
      port: config.default.port,
      username: config.default.user,
      password: config.default.password,
      database: config.default.schema,
      entities: [PostalCode],
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
