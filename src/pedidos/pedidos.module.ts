import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { PedidosProdutosService } from 'src/pedidos_produtos/pedidos_produtos.service';
import { ProdutosService } from 'src/produtos/produtos.service';
import { Produto } from 'src/produtos/entities/produto.entity';
import { PedidosProduto } from 'src/pedidos_produtos/entities/pedidos_produto.entity';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Module({imports: [
  TypeOrmModule.forFeature([Pedido, Pessoa,Produto, PedidosProduto]), 
],
  controllers: [PedidosController],
  providers: [PedidosService,PedidosProdutosService,ProdutosService, PessoasService],
  exports: [PedidosService],
})
export class PedidosModule {}
