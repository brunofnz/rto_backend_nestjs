import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';
import { PaginatedResult, PaginateFunction, paginator } from 'src/prisma/paginator';
const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class TurnosService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly vehiculosService: VehiculosService,
  ) {}

  create(createTurnoDto: CreateTurnoDto) {
    const { idVehiculo, ...data } = createTurnoDto;
    const vehiculo = this.vehiculosService.findOne(idVehiculo);
    if (!vehiculo) {
      throw new Error('Vehiculo no encontrado');
    }
    return this.prismaService.turno.create({ data: createTurnoDto });
  }

  async findAll({ page, search, order, direction }: { page: number, search: string, order: string, direction: string }) {
    let conditions = [];

    if (search) {
      conditions.push(
        // { vehiculo: { patente: { contains: search } } },
        // { cliente: { nombre: { contains: search } } },
        // { cliente: { apellido: { contains: search } } },
        // { cliente: { cuit: { contains: search } } },
        { fecha : { contains: search } },
        { hora : { contains: search } },
      );
    }

    const include = {
      cliente: true,
      vehiculo: true,
    }

    const where = conditions.length > 0 ? {  OR: conditions   } : {}
    const orderBy = order ? { [order]: direction ? direction : 'desc' } : { id: 'desc' }
    const data: PaginatedResult<any> = await paginate(this.prismaService.turno, { where, orderBy, include }, { page: +page })
    const total = await this.prismaService.turno.findMany();
    return {
      data: total?.length > 0 ? total : [],
    }
  }

  findOne(id: number) {
    return this.prismaService.turno.findUnique({ where: { id } });
  }

  update(id: number, updateTurnoDto: UpdateTurnoDto) {
    return this.prismaService.turno.update({ where: { id }, data: updateTurnoDto });
  }

  remove(id: number) {
    return this.prismaService.turno.delete({ where: { id } });
  }
}
