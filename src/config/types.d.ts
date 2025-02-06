interface EnvConfig {
  
    PORT: number;
    DB_HOST: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
    
  interface DbConfig {
    host: string
  }
  
  interface CryptoConfig {
    jwt: { secret: string; expiration: string };
  }
  