import { PedidosProduto } from "src/pedidos_produtos/entities/pedidos_produto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('produto')
export class Produto {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column({ type: 'float' , nullable: false }) 
    valor: number;
    @Column({ type: 'varchar', nullable: false })
    nome: string;
    @Column({ type: 'boolean', nullable: true })
    favorito: boolean;
    @Column({type:'varchar', nullable: false })
    descricao: string;
    @CreateDateColumn({ type: 'timestamp',nullable:false }) 
    data_cadastro: Date;
    @OneToMany(()=>PedidosProduto,(pedidos_produto)=>pedidos_produto.produto)
    pedidos_produto:PedidosProduto[];
}
