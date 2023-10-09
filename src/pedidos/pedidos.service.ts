import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidosProdutosService } from '../pedidos_produtos/pedidos_produtos.service';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreatePedidosProdutoDto } from 'src/pedidos_produtos/dto/create-pedidos_produto.dto';
import { Produto } from 'src/produtos/entities/produto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly pedidosProdutosService: PedidosProdutosService,
  ) {}

  async create(
    pessoaId: number,
    produtoIds: number[],
    quantidades: number[],
  ): Promise<Pedido> {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id: pessoaId },
    });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${pessoaId} não encontrada.`);
    }

    const novoPedido = new Pedido();
    novoPedido.pessoa = pessoa;

    const pedido = await this.pedidoRepository.save(novoPedido);

    const createPedidosProdutoDto = new CreatePedidosProdutoDto();
    createPedidosProdutoDto.pedidoId = pedido.id;
    createPedidosProdutoDto.produtoIds = produtoIds;
    createPedidosProdutoDto.quantidades = quantidades;

    await this.pedidosProdutosService.create(createPedidosProdutoDto);

    return ;
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({where:{id}});
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }
    return pedido;
  }


  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}