import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AppConfigService {
    private readonly _db: DbConfig;
    private readonly _crypto: CryptoConfig;
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
    }
    get db() {
        return this._db;
    }

    get crypto() {
        return this._crypto;
    }
    get config() {
        return {
          db: this._db,
          crypto: this._crypto
        };
      }

}
