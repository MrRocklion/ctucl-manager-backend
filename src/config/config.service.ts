import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AppConfigService {
    private readonly _db: DbConfig;
    private readonly _mqtt: MqttConfig;
    private readonly _firebase: FirebaseConfig;
    constructor(private readonly configService: ConfigService<EnvConfig>) {
        this._db = {
            host: this.configService.get('DB_HOST') as string
        };
        this._mqtt = {
            broker: this.configService.get('BROKER_URL') as string,
            port:this.configService.get('BROKER_PORT') as number,
            username:this.configService.get('USERNAME_BROKER') as string,
            password:this.configService.get('PASSWORD_BROKER') as string
        }
        this._firebase = {
            project_id: this.configService.get('FIREBASE_PROJECT_ID') as string,
            client_email: this.configService.get('FIREBASE_CLIENT_EMAIL') as string,
            private_key: this.configService.get('FIREBASE_PRIVATE_KEY') as string
        }
    }
    get config() {
        return {
          db: this._db,
          mqtt:this._mqtt,
          firebase:this._firebase
        };
      }
    
}
