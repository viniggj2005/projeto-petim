import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto,Pessoa]),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService,PessoasService],
})
export class ProdutosModule {}
