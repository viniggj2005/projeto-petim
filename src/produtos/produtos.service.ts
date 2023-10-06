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

  async create(createProdutoDto: CreateProdutoDto, cpfUsuario: string): Promise<Produto> {

    const usuario = await this.pessoasService.findByCpf(cpfUsuario);
    if (!usuario) {
      throw new NotFoundException(`Usuário com CPF ${cpfUsuario} não encontrado.`);
    }
    if (!usuario.admin) {
      throw new BadRequestException(`Usuário com CPF ${cpfUsuario} não tem permissão para criar produtos.`);
    }

    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
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

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    this.produtoRepository.merge(produto, updateProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.remove(produto);
  }
}
