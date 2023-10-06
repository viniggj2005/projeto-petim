import { IsNotEmpty } from "class-validator";

export class CreatePedidosProdutoDto {

    @IsNotEmpty()
    produtoId: number;

    @IsNotEmpty()
    quantidade: number;
  }
