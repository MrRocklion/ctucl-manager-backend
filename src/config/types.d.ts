

interface EnvConfig {
  
    PORT: number;
    DB_HOST: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    BROKER_URL: string;
    BROKER_PORT:number
    USERNAME_BROKER:string
    PASSWORD_BROKER:string
    }
    
  interface DbConfig {
    host: string
  }
  
  interface CryptoConfig {
    jwt: { secret: string; expiration: string };
  }
  interface MqttConfig{
    broker: string;
    port:number
    username:string
    password:string
  }