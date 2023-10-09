import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private pessoaRepository:Repository<Pessoa>,
  ){}
  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return this.pessoaRepository.save(pessoa);
  }
  async page(page: number,numberitens:number): Promise<Pessoa[]> {
    const pageSize = numberitens;
    if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
      throw new BadRequestException('O valor da página deve ser um número inteiro válido maior que zero.');
    }
    const skip = (page - 1) * pageSize;
    return this.pessoaRepository
      .createQueryBuilder('pessoa')
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  
  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({where:{id}});
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with id ${id} not found`);
    }
    return pessoa;
  }

 
async findByCpf(cpf: string): Promise<Pessoa | undefined> {
    return this.pessoaRepository.findOne({ where: { cpf } });
  }

}
