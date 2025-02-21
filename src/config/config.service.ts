import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AppConfigService {
    private readonly _db: DbConfig;
    private readonly _crypto: CryptoConfig;
    private readonly _mqtt: MqttConfig;
    constructor(private readonly configService: ConfigService<EnvConfig>) {
        this._db = {
            host: this.configService.get('DB_HOST') as string,
        };
        this._crypto = {
            jwt: {
                secret: this.configService.get('JWT_SECRET') as string,
                expiration: this.configService.get('JWT_EXPIRATION') as string
            },
        };
        this._mqtt = {
            broker: this.configService.get('BROKER_URL') as string,
            port:this.configService.get('BROKER_PORT') as number,
            username:this.configService.get('USERNAME_BROKER') as string,
            password:this.configService.get('PASSWORD_BROKER') as string,
        }
    }
    get db() {
        return this._db;
    }

    get crypto() {
        return this._crypto;
    }
    get mqtt_vars(){
        return this._mqtt;
    }
    get config() {
        return {
          db: this._db,
          crypto: this._crypto,
          mqtt:this._mqtt
        };
      }
    
}
