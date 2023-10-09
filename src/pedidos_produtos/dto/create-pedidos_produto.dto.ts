import { IsInt, IsNotEmpty, IsArray } from 'class-validator';
import { CreatePedidoDto } from 'src/pedidos/dto/create-pedido.dto';

export class CreatePedidosProdutoDto {
   
    createPedidoDto: CreatePedidoDto; 
    pedidoId: number;
    produtoIds: number[];
    quantidades: number[];
      
}
