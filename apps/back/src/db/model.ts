import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Room {
  @PrimaryGeneratedColumn()
  abstract id: number;

  @Column({
    length: 100,
  })
  abstract title: string;

  @Column()
  abstract free: boolean;

  @Column()
  abstract x: number;

  @Column()
  abstract y: number;

  @Column()
  abstract width: number;

  @Column()
  abstract height: number;
}
