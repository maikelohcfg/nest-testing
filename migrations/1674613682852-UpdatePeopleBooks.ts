import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePeopleBooks1674613682852 implements MigrationInterface {
  name = 'UpdatePeopleBooks1674613682852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" ADD "authorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD "authorDateOfBirth" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_453355d179308cd5c97ba13f4fe" FOREIGN KEY ("authorId", "authorDateOfBirth") REFERENCES "general"."peoples"("id","dateOfBirth") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_453355d179308cd5c97ba13f4fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP COLUMN "authorDateOfBirth"`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "authorId"`);
  }
}
