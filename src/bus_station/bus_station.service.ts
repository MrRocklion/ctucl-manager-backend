import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttCommand } from './dto/bus-station-mqtt.dto';

@Injectable()
export class BusStationService {
  constructor(private prismaService: PrismaService){}

    async exectMqttCommand(mqttcomand:MqttCommand){
        try {    
            console.log(mqttcomand) 
            return {message:"peticion realizada con exito",status:200,result:true}
        } catch (error) {
            return {message:error,status:500,result:false}
        }
    }

}
