import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PREFIJO DE LA URL QUE SIEMPRE VA ESTAR AHI
  app.setGlobalPrefix("api/v1");

  // ESTO HACE LAS VALIDACIONES DE FORMAR GLOBAL LOS DATOS DE ENTRADA
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // admite lo de la lista blanca que son los DTO 
      forbidNonWhitelisted: true, // envia eror al cliente si envia otra cosa
      transform: true, // TRANSFORMA AUTOMATICAMENTE LOS DATOS, 
                        // CUANDO PUEDE DE NUMBER A STRING O VICE VERSA SEGUN EL "DTO"
    })
  );

  // PUERTO 
  await app.listen(3000);
}
bootstrap();
