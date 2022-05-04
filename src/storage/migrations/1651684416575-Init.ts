import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1651684416575 implements MigrationInterface {
    name = 'Init1651684416575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LOGS_update" ("id" SERIAL NOT NULL, "timestampCreate" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, CONSTRAINT "PK_a77293fe1006ec1460017a4e01a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "LOGS_update"`);
    }

}
