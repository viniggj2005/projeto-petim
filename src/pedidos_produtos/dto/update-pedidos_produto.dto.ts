import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosProdutoDto } from './create-pedidos_produto.dto';

export class UpdatePedidosProdutoDto extends PartialType(CreatePedidosProdutoDto) {}
