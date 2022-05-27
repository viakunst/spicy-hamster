<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220527175553 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction ADD amount INT NOT NULL, ADD times_reminded INT NOT NULL');
        $this->addSql('ALTER TABLE mail DROP FOREIGN KEY FK_5126AC48217BBB47');
        $this->addSql('DROP INDEX IDX_5126AC48217BBB47 ON mail');
        $this->addSql('ALTER TABLE mail ADD send_by VARCHAR(255) NOT NULL, DROP person_id');
        $this->addSql('ALTER TABLE transaction_group DROP amount');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mail ADD person_id CHAR(36) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:guid)\', DROP send_by');
        $this->addSql('ALTER TABLE mail ADD CONSTRAINT FK_5126AC48217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_5126AC48217BBB47 ON mail (person_id)');
        $this->addSql('ALTER TABLE `Transaction` DROP amount, DROP times_reminded');
        $this->addSql('ALTER TABLE transaction_group ADD amount INT NOT NULL');
    }
}
