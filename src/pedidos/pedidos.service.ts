import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { Pessoa } from '../pessoas/entities/pessoa.entity'; // Importe a entidade Pessoa

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Pessoa) 
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { pessoaId } = createPedidoDto;

    const pessoa = await this.pessoaRepository.findOne({ where: { id: pessoaId } });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${pessoaId} não encontrada.`);
    }

    const novoPedido = new Pedido();
    novoPedido.pessoa = pessoa;

    return this.pedidoRepository.save(novoPedido);
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

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);

    const pessoa = await this.pessoaRepository.findOne({ where: { id: updatePedidoDto.pessoaId } } as FindOneOptions<Pessoa>);

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${updatePedidoDto.pessoaId} não encontrada.`);
    }

    pedido.pessoa = pessoa;

    const pedidoAtualizado = await this.pedidoRepository.save(pedido);
    return pedidoAtualizado;
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}