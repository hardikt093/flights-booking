import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class User1695282731474 implements MigrationInterface {
  tokenForeignKey = new TableForeignKey({
    columnNames: ['allUsersId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'allUsers',
    onDelete: 'CASCADE',
  });
  allUsersForeignKey = new TableForeignKey({
    columnNames: ['userRoleId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'userRoles',
    onDelete: 'CASCADE',
  });
  flightForeignKey = new TableForeignKey({
    columnNames: ['allUsersId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'allUsers',
    onDelete: 'CASCADE',
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userRoles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            isNullable: false,
            isUnique: true,
            type: 'varchar',
          }
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'allUsers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'email',
            isNullable: false,
            isUnique: true,
            type: 'varchar',
          },
          {
            name: 'password',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'userRoleId',
            isNullable: false,
            type: 'uuid',
          }
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['refresh'],
          },
          {
            name: 'expires',
            isNullable: false,
            type: 'timestamp',
          },
          {
            name: 'blacklisted',
            isNullable: false,
            type: 'boolean',
          },
          {
            name: 'allUsersId',
            isNullable: false,
            type: 'uuid',
          }
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'flights',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'from',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'to',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'departure',
            type: 'varchar'
          },
          {
            name: 'return',
            type: 'varchar'
          },
          {
            name: 'image',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'bookedCount',
            isNullable: false,
            default: 0,
            type: 'integer',
          },
          {
            name: 'allUsersId',
            isNullable: false,
            type: 'uuid',
          }
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'allUsersId',
            isNullable: false,
            type: 'uuid',
          },
          {
            name: 'flightId',
            isNullable: false,
            type: 'uuid',
          }
        ],
      })
    );
    await queryRunner.createForeignKey('tokens', this.tokenForeignKey);
    await queryRunner.createForeignKey('flights', this.flightForeignKey);
    await queryRunner.createForeignKey('allUsers', this.allUsersForeignKey);
    await queryRunner.createIndex(
      'allUsers',
      new TableIndex({
        name: 'email_index',
        columnNames: ['email'],
      })
    );

    //Seeding data
    await queryRunner.query(`INSERT INTO "userRoles" (name) VALUES ('flight'),('user')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tokens', this.tokenForeignKey);
    await queryRunner.dropForeignKey('flights', this.flightForeignKey);
    await queryRunner.dropForeignKey('allUsers', this.allUsersForeignKey);
    await queryRunner.dropTable('userRoles');
    await queryRunner.dropTable('tokens');
    await queryRunner.dropTable('flights');
    await queryRunner.dropIndex(
      'allUsers',
      new TableIndex({
        name: 'email_index',
        columnNames: ['email'],
      })
    );
    await queryRunner.dropTable('allUsers');
  }
}
