import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { UsuarioDto } from '../../dto/usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
      ) {}
    
      async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
      }
    
      async findOne(id_usuario: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({where:{id_usuario}});
        if (!usuario) {
          throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
      }
    
      async create(usuarioDto: UsuarioDto): Promise<Usuario> {
        const nuevoUsuario = this.usuarioRepository.create(usuarioDto);
        return await this.usuarioRepository.save(nuevoUsuario);
      }
    
      async update(id: number, usuarioDto: UsuarioDto): Promise<Usuario> {
        const usuario = await this.findOne(id);
        Object.assign(usuario, usuarioDto); // Copia las propiedades del DTO al usuario
        return await this.usuarioRepository.save(usuario);
      }
    
      async remove(id: number): Promise<void> {
        const usuario = await this.findOne(id);
        await this.usuarioRepository.remove(usuario);
      }
}
