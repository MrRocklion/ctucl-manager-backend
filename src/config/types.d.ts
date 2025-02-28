

interface EnvConfig {
  
    PORT: number
    DB_HOST: string
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