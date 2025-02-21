import { ApiProperty } from '@nestjs/swagger';
import {mqtt_commands} from "@prisma/client";


export class MqttCommand implements Omit<mqtt_commands, 'id' |'createdAt'> {

    @ApiProperty({ example: 1, description: 'Longitud geográfica del punto de carga' })
    user_id: number;

    @ApiProperty({ example: "jhon", description: 'Longitud geográfica del punto de carga' })
    name: string;

    @ApiProperty({ example: "doe", description: 'Longitud geográfica del punto de carga' })
    lastname: string;

    @ApiProperty({ example: "jhondoe@example.com", description: 'Longitud geográfica del punto de carga' })
    email: string;


    @ApiProperty({ example: "test_arrow", description: 'Longitud geográfica del punto de carga' })
    command: string;
    
    @ApiProperty({ example: "jhondoe", description: 'Longitud geográfica del punto de carga' })
    username: string;

}