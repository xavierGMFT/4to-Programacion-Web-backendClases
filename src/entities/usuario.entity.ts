import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
    
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'correoElectronico' })
  correoElectronico: string;

  @Column({ name: 'fechaNacimiento' })
  fechaNacimiento: Date;

  @Column({ name: 'numeroTelefonico' })
  numeroTelefonico: string;
}
