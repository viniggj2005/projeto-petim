import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

//   @Get()
//   findAll() {
//     return this.pedidosProdutosService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.pedidosProdutosService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePedidosProdutoDto: UpdatePedidosProdutoDto) {
//     return this.pedidosProdutosService.update(+id, updatePedidosProdutoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.pedidosProdutosService.remove(+id);
//   }
 }
