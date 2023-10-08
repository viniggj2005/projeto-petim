import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { PedidosProdutosService } from 'src/pedidos_produtos/pedidos_produtos.service'; // Importe o serviço PedidosProdutosService
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly pedidosProdutosService: PedidosProdutosService,
  ) {}

  async create(
    createPedidoDto: CreatePedidoDto,
  ): Promise<{ pedido: Pedido; produtosCriados: string }> {
    const pedido = this.pedidoRepository.create(createPedidoDto);
    const novoPedido = await this.pedidoRepository.save(pedido);

    const produtosCriados = await this.pedidosProdutosService.create(
      novoPedido.id,
      createPedidoDto.produtosIds,
      createPedidoDto.quantidades,
    );

    return { pedido: novoPedido, produtosCriados };
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    this.pedidoRepository.merge(pedido, updatePedidoDto);
    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}
