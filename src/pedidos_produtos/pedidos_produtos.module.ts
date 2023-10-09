import { Module } from '@nestjs/common';
import { PedidosProdutosService } from './pedidos_produtos.service';
import { PedidosProdutosController } from './pedidos_produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosProduto } from './entities/pedidos_produto.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { ProdutosService } from 'src/produtos/produtos.service';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Module({
  imports: [PessoasModule,
    TypeOrmModule.forFeature([PedidosProduto,Produto,Pedido]),
  ],
  controllers: [PedidosProdutosController],
  providers: [PedidosProdutosService,ProdutosService],
  exports:[PedidosProdutosService]
})
export class PedidosProdutosModule {}
