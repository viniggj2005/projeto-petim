import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidosProdutoDto } from './dto/create-pedidos_produto.dto';
import { UpdatePedidosProdutoDto } from './dto/update-pedidos_produto.dto';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { ProdutosService } from 'src/produtos/produtos.service';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidosProduto } from './entities/pedidos_produto.entity';
@Injectable()
export class PedidosProdutosService {
  constructor(
    private readonly produtosService: ProdutosService,
    private readonly pessoasService: PessoasService,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(
    pedidoId: number,
    produtoIds: number[],
    quantidades: number[],
  ): Promise<string> {
    const pedido = await this.pedidoRepository.findOne(pedidoId);
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${pedidoId} não encontrado.`);
    }

    const produtos: Produto[] = await this.produtoRepository.findByIds(
      produtoIds,
    );

    if (produtos.length !== produtoIds.length) {
      throw new NotFoundException(
        'Alguns produtos com IDs fornecidos não foram encontrados.',
      );
    }

    const totalPedidos = produtoIds.length;
    let mensagem = '';

    for (let i = 0; i < totalPedidos; i++) {
      const quantidade = quantidades[i];
      const produto = produtos[i];

      const valorTotal = produto.valor * quantidade;

      const pedidosProdutoInstance = new PedidosProduto();
      pedidosProdutoInstance.pedido = pedido;
      pedidosProdutoInstance.produto = produto;
      pedidosProdutoInstance.quantidade = quantidade;
      pedidosProdutoInstance.valor_total = valorTotal;

      await pedidosProdutoInstance.save();

      mensagem += `Pedido para ${quantidade} ${produto.nome}(s) adicionado. Valor Total: ${valorTotal}\n`;
    }

    return mensagem;
  }
  async findAll() {
    // Implemente a lógica para encontrar todos os pedidosProdutos aqui
  }

  async findOne(id: number) {
    // Implemente a lógica para encontrar um pedidosProduto por ID aqui
  }

  async update(id: number, updatePedidosProdutoDto: UpdatePedidosProdutoDto) {
    // Implemente a lógica para atualizar um pedidosProduto por ID aqui
  }

  async remove(id: number) {
    // Implemente a lógica para remover um pedidosProduto por ID aqui
  }
}
