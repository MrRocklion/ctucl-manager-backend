import { MigrationInterface, QueryRunner } from "typeorm";

export class IsActive1747929678044 implements MigrationInterface {
    name = 'IsActive1747929678044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charging_point" ADD "is_active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charging_point" DROP COLUMN "is_active"`);
    }

}
