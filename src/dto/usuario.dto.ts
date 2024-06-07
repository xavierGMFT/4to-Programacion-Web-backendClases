
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsDateString } from 'class-validator';
export class UsuarioDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
  correoElectronico: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato válido' })
  fechaNacimiento: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'El número de teléfono debe tener un formato válido'}) // Aquí usamos el tipo CountryCode
  numeroTelefonico: string;
}
