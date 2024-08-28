import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurnosModule } from './turnos/turnos.module';
import { PrismaModule } from './prisma/prisma.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [PrismaModule,TurnosModule, VehiculosModule, ClientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
