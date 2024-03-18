import { User } from "../../users/entities/user.entity";
import { Pets } from "../../pets/entities/pet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { tipoPublicacionEnum } from "../../common/enums/tipoPublicacion.enum";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    idPost: number;

    @Column({ type: 'enum', enum: tipoPublicacionEnum })
    typePost: tipoPublicacionEnum;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Usa una función para que TypeORM interprete CURRENT_TIMESTAMP como una función de MySQL
    postDate: Date;

    @ManyToOne(() => User, (user) => user.posting)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'idUser', })
    user: User;

    @Column()
    user_id: number;

}

