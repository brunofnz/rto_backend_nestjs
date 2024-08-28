import { IsNumber } from "class-validator"

export class CreateTurnoDto {
  fecha: Date
  hora: Date
  
  @IsNumber()
  idVehiculo: number

  @IsNumber()
  idCliente: number
}
