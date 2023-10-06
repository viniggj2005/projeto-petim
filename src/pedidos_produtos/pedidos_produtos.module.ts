import { Module } from '@nestjs/common';
import { PedidosProdutosService } from './pedidos_produtos.service';
import { PedidosProdutosController } from './pedidos_produtos.controller';

@Module({
  controllers: [PedidosProdutosController],
  providers: [PedidosProdutosService],
})
export class PedidosProdutosModule {}
