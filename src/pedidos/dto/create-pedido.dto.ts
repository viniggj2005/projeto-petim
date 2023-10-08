import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  pessoaId: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  produtosIds: number[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  quantidades: number[];
}
