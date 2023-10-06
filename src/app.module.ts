import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosProdutosModule } from './pedidos_produtos/pedidos_produtos.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useClass: PostgresConfigService,
    inject: [PostgresConfigService],
  }),
  PessoasModule,
  PedidosModule,
  PedidosProdutosModule,
  ProdutosModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
