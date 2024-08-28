import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    try {
      return this.prismaService.cliente.create({ data: createClienteDto });
    } catch (error) {
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }
  }

  findAll() {
    try {
      return this.prismaService.cliente.findMany();
    } catch (error) {
      throw new HttpException('No existen clientes', HttpStatus.NOT_FOUND);
    }  
  }

  findOne(id: number) {
    try {
      return this.prismaService.cliente.findFirst({ where: { id } });
    } catch (error) {
      throw new HttpException('No existe el cliente', HttpStatus.NOT_FOUND);
    }  
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      return this.prismaService.cliente.update({ where: { id }, data: updateClienteDto });
    } catch (error) {
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }  
  }

  remove(id: number) {
    try {
      return this.prismaService.cliente.update({ where: { id }, data: { deletedAt: new Date() } });
    } catch (error) {
      
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }
  }

  restore(id: number) {
    try {
      return this.prismaService.cliente.update({ where: { id }, data: { deletedAt: null } });
    } catch (error) {
      
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }
  }
}
