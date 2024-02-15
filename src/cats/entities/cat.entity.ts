// LAS ENTIDADES REPRESENTAN LAS TABLAS DE LA "BD"
// CADA VEZ QUE SE REALICEN PETICIONES A LA "BD" USAREMOS LAS ENTITY
// PARA CONECTAR A LA BD USAMOS EL PAQUETE
// npm install --save @nestjs/typeorm typeorm mysql2

import { User } from "../../users/entities/user.entity";
import { Breed } from "../../breeds/entities/breed.entity";
import {
    Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
  
  @Entity()
  export class Cat {
    // @Column({ primary: true, generated: true})
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    age: number;  
  
    @DeleteDateColumn()
    deletedAt: Date;

    /* el many-to-one recibe una funcion de flecha */
    @ManyToOne(() => Breed , (breed) => breed.id, {
      // cascade: true,
      eager: true, // para que traiga las raza al hacer un findOne
    })
    breed: Breed; // se le pasa toda la instancia del Breed

    @ManyToOne( () => User ) /** con esto le digo que debe usar el campo email como referencia */
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    user: User;

    @Column()
    userEmail: string; /** con esto evito tener que pasar la instancia del usuario */
  }
  /* para relacionar la tabla cats co breed es de many-to-one porque muchos gatos pueden tener la misma raza */
  /** EN ESTE CASO, CATS TIENE LA REFERENCIA A LA TABLA BREEDS */