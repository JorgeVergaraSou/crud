import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) //en esta linea inyectamos el repositorio de la entidad creada
    private readonly catRepository: Repository<Cat>, /* INICIALIZAMOS LA VARIABLE "catRepository" 
    y usamos el repository y le decimos que ese repositorio
    se comporta como esa entidad    */
    @InjectRepository(Breed) /* PARA USAR LA RELACION DEBEMOS INJECTAR EL REPOSITORY DE LA ENTIDAD */
    private readonly breedRepository: Repository<Breed> /** AL INJECTAR EL REPOSITORIO, SE TRABAJA DIRECTAMENTE CON LA bd */
  ) { }

  // LAS FUNCIONES DE LOS SERVICIOS RECIBEN LA PETICION DESDE EL CONTROLADOR
  // SE CONECTA A LA "BD", EJECUTA LA PETICION Y LA DEVUELVE AL CONTROLADOR

  // usamos el async
  // ------------- INICIO CREATE -----------
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {

    /** debido al principio de responsabilidad, de que un metodo solo haga una cosa es que se puede 
 * crear un nuevo metodo y ser llamado */
    const breed = await this.validateBreed(createCatDto.breed)

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    })
    // ---------------- FIN CREATE ----------

    /* create(createCatDto) es una nueva instancia del objeto 
  que se esta creando, no significa que ya esta guardado */
    //const cat = this.catRepository.create(createCatDto);


    /* esta linea es la que guarda la informacion en la base*/
    // return await this.catRepository.save(createCatDto);
    /* para no usar el create: return await this.catRepository.save(createCatDto); */


  }

  /** con esta linea ya se puede llamar a la BD y traer todos los datos, filtrado por 1 usuario */
  async findAll(user: UserActiveInterface) {
/** si el rol es admin, regresara todos los registros */
    if (user.role === Role.ADMIN){
      return await this.catRepository.find();
    }

    return await this.catRepository.find({
      where: { userEmail: user.email}
    });
  }

  async findOne(id: number, user: UserActiveInterface) { /* busca un registro, se puede buscar por cualquier cammpo */
    const cat =  await this.catRepository.findOneBy({ id });
/** si no existe el gato lanza una excepcion */
    if (!cat){
      throw new BadRequestException('no existe gato');
    }
/** debido al principio de responsabilidad, de que un metodo solo haga una cosa es que se puede 
 * crear un nuevo metodo y ser llamado */
    this.validateOwnerShip(cat, user)

    return cat;

  }
  /* recibe dos parametros, el id y el dto del update, con los datos */
  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    // return await this.catRepository.update(id, updateCatDto);

    await this.findOne(id, user );
    return await this.catRepository.update(id, {
      ...updateCatDto,
      /** esta linea verifica si existe o no el breed, al ser opcional, si no es enviado el breed va a
       * devolver undefined y no lo actualiza, si existe el elemento breed verifica que exista
       */
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email,
    })

  }

  async remove(id: number, user: UserActiveInterface) {
    /* no borra el archivo, solo lo inactiva, se le pasa el id */
    /** para remover vamos a verificar que el usuario este habilitado
     * con el siguiente metodo      */
    await this.findOne(id, user );

    return await this.catRepository.softDelete({ id });

    /* se le pasa la instancia para eliminar */
    // return await this.catRepository.softRemove({id});
  }

  private validateOwnerShip(cat: Cat, user: UserActiveInterface){
/** si el role no es admin y el email no coincide lanza que no esta autorizado */
if (user.role !== Role.ADMIN && cat.userEmail !== user.email){
  throw new UnauthorizedException()
}
  }

  private async validateBreed(breed: string){
    /* cuando vayamos a crear un gato primero va a buscar el nombre de la raza  */
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
    /* si no existe va lanzar un error y si existe va a guardar el gato con la raza encontrada */
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity
  }
}
