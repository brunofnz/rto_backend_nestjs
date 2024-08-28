import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    
    return this.turnosService.create({
      ...createTurnoDto,
      fecha: new Date(createTurnoDto.fecha),
      hora: new Date(createTurnoDto.hora),
    });
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('search') search: string,
    @Query('order') order: string,
    @Query('direction') direction: string,
  ) {
    return this.turnosService.findAll({
      page: +page,
      search,
      order,
      direction
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnosService.remove(+id);
  }
}
