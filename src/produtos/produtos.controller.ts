import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    const { cpf, ...outrosCampos } = createProdutoDto;
    try {
      const produto = await this.produtosService.create(createProdutoDto, cpf);
      return { message: 'Produto criado com sucesso', produto };
    } catch (error) {
      throw error;
    }
  }

  @Post('/favoritar/:id')
favoritar(@Param('id') id: string, @Body() { cpf }: { cpf: string }) {
  return this.produtosService.favoritar(+id, cpf);
}


@Get('page/:page/:numberitens')
page(@Param('page') page: number, @Param('numberitens') numberitens: number) {
  return this.produtosService.page(+page, +numberitens);
}
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() { cpf, ...updateProdutoDto }: UpdateProdutoDto) {
    try {
      const produto = await this.produtosService.update(+id, updateProdutoDto, cpf);
      return { message: 'Produto alterado com sucesso', produto };
    } catch (error) {
      throw error;
    }
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
