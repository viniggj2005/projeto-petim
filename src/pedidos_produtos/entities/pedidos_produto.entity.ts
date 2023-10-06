import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos_produtos')
export class PedidosProduto {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column({ type: 'int'}) 
    quantidade: number;

    @Column({ type: 'float' }) 
    valor_total: number;

    @ManyToOne(()=>Pedido,(pedido)=>pedido.pedidos_produto, { nullable: false})
    pedido:Pedido;
    @ManyToOne(()=>Produto,(produto)=>produto.pedidos_produto, { nullable: false })
    produto:Produto;



}
