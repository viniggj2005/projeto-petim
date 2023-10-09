import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  pessoaId: number;
  


  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  produtoIds: number[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  quantidades: number[];
}