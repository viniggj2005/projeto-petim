import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas/pessoas.service';
@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Produto)
    private pessoaRepository: Repository<Produto>,
    private readonly pessoasService: PessoasService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, cpf: string): Promise<Produto> {

    const usuario = await this.pessoasService.findByCpf(cpf);
    if (!usuario) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }
    if (!usuario.admin) {
      throw new BadRequestException(`Usuário com CPF ${cpf} não tem permissão para criar produtos.`);
    }

    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }
  async page(page: number): Promise<Produto[]> {
    const pageSize = 20;
    if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
      throw new BadRequestException('O valor da página deve ser um número inteiro válido maior que zero.');
    }
    const skip = (page - 1) * pageSize;
    return this.produtoRepository
      .createQueryBuilder('produto')
      .skip(skip)
      .take(pageSize)
      .getMany();
  }
  
  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({where:{id}});
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto, cpf: string): Promise<Produto> {
    
    const usuario = await this.pessoasService.findByCpf(cpf);
    if (!usuario) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }
    if (!usuario.admin) {
      throw new BadRequestException(`Usuário com CPF ${cpf} não tem permissão para atualizar produtos.`);
    }
    const produto = await this.findOne(id);
    this.produtoRepository.merge(produto, updateProdutoDto);
    return this.produtoRepository.save(produto);
  }
  
  async favoritar(id: number, cpf: string): Promise<Produto> {
    const usuario = await this.pessoasService.findByCpf(cpf);
    if (!usuario) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }
    if (!usuario.admin) {
      throw new BadRequestException(`Usuário com CPF ${cpf} não tem permissão para favoritar produtos.`);
    }
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    produto.favorito = true;
    const updatedproduto = await this.produtoRepository.save(produto);
  
    return updatedproduto;
  }
  

  async remove(id: number, cpf: string): Promise<void> {
    const usuario = await this.pessoasService.findByCpf(cpf);
    if (!usuario) {
      throw new NotFoundException(`Usuário com CPF ${cpf} não encontrado.`);
    }
    if (!usuario.admin) {
      throw new BadRequestException(`Usuário com CPF ${cpf} não tem permissão para remover produtos.`);
    }
    const produto = await this.produtoRepository.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    await this.produtoRepository.remove(produto);
  }
  
}
