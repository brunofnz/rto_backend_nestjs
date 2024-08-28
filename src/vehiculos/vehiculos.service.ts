import { Injectable } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiculosService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  create(createVehiculoDto: CreateVehiculoDto) {
    return this.prismaService.vehiculo.create({ data: createVehiculoDto });
  }

  findAll() {
    return this.prismaService.vehiculo.findMany({
      include: {
        cliente: true,
        turno: true
      }
    });
  }

  findOne(id: number) {
    return this.prismaService.vehiculo.findUnique({ where: { id } });
  }

  update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    return this.prismaService.vehiculo.update({ where: { id }, data: updateVehiculoDto });
  }

  remove(id: number) {
    return this.prismaService.vehiculo.delete({ where: { id } });
  }
}
