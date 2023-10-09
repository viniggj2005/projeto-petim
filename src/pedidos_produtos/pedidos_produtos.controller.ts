import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException } from '@nestjs/common';
import { PedidosProdutosService } from './pedidos_produtos.service';
import { CreatePedidosProdutoDto } from './dto/create-pedidos_produto.dto';
import { UpdatePedidosProdutoDto } from './dto/update-pedidos_produto.dto';

@Controller('pedidos-produtos')
export class PedidosProdutosController {
    constructor(private readonly pedidosProdutosService: PedidosProdutosService) {}

    @Post()
    async create(@Body() createPedidosProdutoDto: CreatePedidosProdutoDto): Promise<string> {
      return this.pedidosProdutosService.create(createPedidosProdutoDto);
    }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidosProdutoDto: UpdatePedidosProdutoDto) {
    throw new NotAcceptableException('os pedidos não podem ser atualizados pois pertecem a um usuario')
  }
  @Get('page/:page/:numberitens')
  page(@Param('page') page: number, @Param('numberitens') numberitens: number) {
    return this.pedidosProdutosService.page(+page, +numberitens);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotAcceptableException('os pedidos não podem ser deletados pois pertecem a um usuario')
  }
 }
