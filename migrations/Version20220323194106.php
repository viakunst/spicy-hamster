<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323194106 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D166867F58');
        $this->addSql('CREATE TABLE transaction_group (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', bedrag NUMERIC(5, 2) NOT NULL, activiteit_naam VARCHAR(255) NOT NULL, datum DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE transaction_set');
        $this->addSql('DROP INDEX IDX_723705D166867F58 ON transaction');
        $this->addSql('ALTER TABLE transaction CHANGE transaction_set_id transaction_group_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\'');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1B026F02F FOREIGN KEY (transaction_group_id) REFERENCES transaction_group (id)');
        $this->addSql('CREATE INDEX IDX_723705D1B026F02F ON transaction (transaction_group_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1B026F02F');
        $this->addSql('CREATE TABLE transaction_set (id CHAR(36) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:guid)\', bedrag NUMERIC(5, 2) NOT NULL, activiteit_naam VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, datum DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE transaction_group');
        $this->addSql('DROP INDEX IDX_723705D1B026F02F ON transaction');
        $this->addSql('ALTER TABLE transaction CHANGE transaction_group_id transaction_set_id CHAR(36) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:guid)\'');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D166867F58 FOREIGN KEY (transaction_set_id) REFERENCES transaction_set (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_723705D166867F58 ON transaction (transaction_set_id)');
    }
}
