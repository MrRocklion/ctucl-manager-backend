

interface EnvConfig {
  
    PORT: number
    DB_HOST: string
    JWT_SECRET: string
    JWT_EXPIRATION: string
    BROKER_URL: string
    BROKER_PORT:number
    USERNAME_BROKER:string
    PASSWORD_BROKER:string
    FIREBASE_PROJECT_ID:string
    FIREBASE_CLIENT_EMAIL:string
    FIREBASE_PRIVATE_KEY:string
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
  interface FirebaseConfig{
    project_id:string,
    client_email:string,
    private_key:string
  }