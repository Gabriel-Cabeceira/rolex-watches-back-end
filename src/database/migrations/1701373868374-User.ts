import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class User1701373868374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: "user_id",
                        type: "varchar",
                        isPrimary: true,
                        default: "'N/A'"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                        default: "'N/A'"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                        default: "'N/A'"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                        default: "'N/A'"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
