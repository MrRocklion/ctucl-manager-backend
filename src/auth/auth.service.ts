import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { ValidateUserDto } from 'src/users/dto/validate-user.dto';
import * as admin from 'firebase-admin';
import { AppConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,private readonly configService: AppConfigService) {
        if (!admin.apps.length) {
            admin.initializeApp({
              credential: admin.credential.cert({
                projectId: this.configService.config.firebase.project_id,
                clientEmail:this.configService.config.firebase.client_email,
                privateKey: this.configService.config.firebase.private_key,
              }),
            });
          }
    }

    async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
          return await admin.auth().verifyIdToken(token);
        } catch (error) {
          throw new UnauthorizedException('Invalid or expired token');
        }
    }
    async validateUser(user: LoginDto): Promise<ValidateUserDto> {
        let exists: any
        if(user.email!= null){
           exists = await this.prismaService.users.findUnique({
            where: {
              email: user.email,
            },
          });
        }else{
           exists = await this.prismaService.users.findUnique({
            where: {
              username: user.username,
            },
          });
        }
      
        return exists ? { exists: true, data: exists } : { exists: false, data: null };
      }
    async login(LoginData: LoginDto) {
        try {
            // 1️⃣ Verificar si el usuario existe en PostgreSQL
            const userValid: ValidateUserDto = await this.validateUser(LoginData);
            
            if (!userValid.exists) {
                return {
                    access: false,
                    message: 'Usuario no encontrado en la base de datos',
                    data: {}
                };
            }
    
            // 2️⃣ Verificar el token de Firebase
            const decodedToken = await admin.auth().verifyIdToken(LoginData.firebase_token);
            
            // 3️⃣ Obtener detalles del usuario en Firebase
            const firebaseUser = await admin.auth().getUser(decodedToken.uid);
    
            // 4️⃣ Devolver información detallada
            return {
                access: true,
                message: 'Login exitoso',
                data: {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    phoneNumber: firebaseUser.phoneNumber,
                    provider: decodedToken.firebase.sign_in_provider,
                    roles: decodedToken.roles || [], // Si usas roles en Firebase
                    localData: userValid.data // Datos adicionales de PostgreSQL
                }
            };
            
        } catch (error) {
            console.error('Error en login:', error.message);
    
            let errorMessage = 'Error desconocido';
            if (error.code === 'auth/invalid-id-token') {
                errorMessage = 'Token de Firebase inválido';
            } else if (error.code === 'auth/id-token-expired') {
                errorMessage = 'Token de Firebase expirado';
            }
    
            return {
                access: false,
                message: errorMessage,
                data: {}
            };
        }
    }
    
    
}
