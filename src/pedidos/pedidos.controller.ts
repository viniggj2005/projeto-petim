import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  async createPedido(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidosService.create(createPedidoDto);
    return  pedido;
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
