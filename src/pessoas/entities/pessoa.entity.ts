import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

@Entity('pessoa')

export class Pessoa {
  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false ,unique: true})
  cpf: string;

  @Column({ type: 'boolean', nullable: false,default: false })
  admin: boolean;
  

  @OneToMany(() => Pedido, pedido => pedido.pessoa, { onDelete: 'CASCADE' })
pedido: Pedido[];

}