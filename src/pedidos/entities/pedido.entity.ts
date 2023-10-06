import { PedidosProduto } from "src/pedidos_produtos/entities/pedidos_produto.entity";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @CreateDateColumn({ type: 'timestamp',nullable:false }) 
    data_cadastro: Date;
    @ManyToOne(()=>Pessoa,(pessoa)=>pessoa.pedido, { nullable: false })
    pessoa:Pessoa;
    @OneToMany(()=>PedidosProduto,(pedidos_produto)=>pedidos_produto.pedido)
    pedidos_produto:PedidosProduto[];
}
