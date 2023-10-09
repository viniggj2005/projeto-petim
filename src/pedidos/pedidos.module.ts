import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { PedidosProdutosModule } from 'src/pedidos_produtos/pedidos_produtos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Pessoa]),
    PedidosProdutosModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
