import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pinoParams: Params = {
          pinoHttp: {
            transport:
              config.get<string>('env') === 'local' ? { target: 'pino-pretty' } : undefined,
          },
        };
        return pinoParams;
      },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
