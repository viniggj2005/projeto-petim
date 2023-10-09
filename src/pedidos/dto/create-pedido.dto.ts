import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  pessoaId: number;
}