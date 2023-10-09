import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidosProdutosService } from 'src/pedidos_produtos/pedidos_produtos.service';
import { CreatePedidosProdutoDto } from 'src/pedidos_produtos/dto/create-pedidos_produto.dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService,private readonly pedidosProdutosService: PedidosProdutosService,) {}

  @Post()
  async createPedido(@Body() createPedidoComProdutosDto: CreatePedidoDto): Promise<Pedido> {
    const { pessoaId, produtoIds, quantidades } = createPedidoComProdutosDto;
    const pedido = await this.pedidosService.create(pessoaId, produtoIds, quantidades);
    return pedido;
  }
  

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotAcceptableException('o pedido não pode ser deletado pois é de um usuario')
  }
}
