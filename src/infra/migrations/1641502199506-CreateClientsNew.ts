import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Gender } from '../../app/utils/genderEnum';

export default class CreateClientsNew1641593199506 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'Clientes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                        isNullable: false,
                        isUnique: true
                    },

                    {
                        name: 'nome_completo',
                        type: 'varchar',
                        isNullable: false
                    },

                    {
                        name: 'genero',
                        type: 'enum',
                        enum: [Gender.masculino, Gender.feminino, Gender.outro],
                        isNullable: false
                    },
                    {
                        name: 'data_nascimento',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'idade',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'id_cidade',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_cidade',
                        columnNames: ['id_cidade'],
                        referencedTableName: 'Cidades',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Clientes');
    }
}
