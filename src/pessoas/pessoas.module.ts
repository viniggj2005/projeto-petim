import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { Pessoa } from './entities/pessoa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Pessoa,Pedido])],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports:[PessoasService,]
})
export class PessoasModule {}
