import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeople1674512336120 implements MigrationInterface {
  name = 'CreatePeople1674512336120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS general;`);

    await queryRunner.query(
      `CREATE TABLE "general"."peoples" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, CONSTRAINT "PK_2f109aed750b508ec56c17b9966" PRIMARY KEY ("id", "dateOfBirth")) PARTITION BY RANGE ("dateOfBirth")`,
    );

    await queryRunner.query(
      `
        CREATE TABLE "general"."peoples_2020" PARTITION OF "general"."peoples" FOR VALUES FROM ('2020-01-01') TO ('2020-12-31');
        CREATE TABLE "general"."peoples_2021" PARTITION OF "general"."peoples" FOR VALUES FROM ('2021-01-01') TO ('2021-12-31');
        CREATE TABLE "general"."peoples_2022" PARTITION OF "general"."peoples" FOR VALUES FROM ('2022-01-01') TO ('2022-12-31');
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "general"."peoples"`);
  }
}
