import { Injectable } from '@nestjs/common';
import { CreatePedidosProdutoDto } from './dto/create-pedidos_produto.dto';
import { UpdatePedidosProdutoDto } from './dto/update-pedidos_produto.dto';

@Injectable()
export class PedidosProdutosService {
  create(createPedidosProdutoDto: CreatePedidosProdutoDto) {
    return 'This action adds a new pedidosProduto';
  }

  findAll() {
    return `This action returns all pedidosProdutos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidosProduto`;
  }

  update(id: number, updatePedidosProdutoDto: UpdatePedidosProdutoDto) {
    return `This action updates a #${id} pedidosProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidosProduto`;
  }
}
