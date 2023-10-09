import { Controller, Get, Post, Body, Patch, Param, Delete, NotAcceptableException } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }
  @Get('page/:page/:numberitens')
  page(@Param('page') page: number, @Param('numberitens') numberitens: number) {
    return this.pessoasService.page(+page, +numberitens);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    throw new NotAcceptableException('este usuario não tem permissão para alterar seus dados')
  }

  @Delete(':id')
  async removePessoa(@Param('id') id: number) {
    throw new NotAcceptableException('o usuario não pode ser deletado, pois possui pedidos')
  }
}
