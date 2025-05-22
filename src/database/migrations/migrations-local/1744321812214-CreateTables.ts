import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1744321812214 implements MigrationInterface {
    name = 'CreateTables1744321812214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mqtt_command_history" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "command" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "user_id" integer NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "topic" character varying NOT NULL, CONSTRAINT "PK_b322e2d8be16f7998b26529b2bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_type_enum" AS ENUM('ADMIN', 'STAFF', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "phone" character varying, "register" character varying, "address" character varying, "account_type" "public"."users_account_type_enum" NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "charging_point" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "lat" double precision NOT NULL, "lon" double precision NOT NULL, "description" character varying, "ruc" character varying NOT NULL, "ci" character varying NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "device_id" character varying, "user" character varying, "business_name" character varying NOT NULL, "email" character varying, "phone" character varying NOT NULL, "imei" character varying, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b39f9c25fff30b4eca714c79e92" UNIQUE ("uuid"), CONSTRAINT "PK_bcbc91dba983c6584363511ba9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mqtt_command_history" ADD CONSTRAINT "FK_d6cfa81bec6d57dc2887648e4af" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "mqtt_command_history" DROP CONSTRAINT "FK_d6cfa81bec6d57dc2887648e4af"`);
        await queryRunner.query(`DROP TABLE "charging_point"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_type_enum"`);
        await queryRunner.query(`DROP TABLE "mqtt_command_history"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
