<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220316210334 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE declaration (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', naam VARCHAR(255) NOT NULL, iban VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, item VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, commissie LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', opmerking VARCHAR(255) NOT NULL, akkoord TINYINT(1) NOT NULL, geld NUMERIC(6, 2) NOT NULL, image_name VARCHAR(255) NOT NULL, image_size INT NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mail (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', account VARCHAR(255) NOT NULL, titel VARCHAR(255) NOT NULL, inhoud VARCHAR(255) NOT NULL, verzender VARCHAR(255) NOT NULL, zend_tijd DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reciever (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', mail_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', account VARCHAR(255) NOT NULL, INDEX IDX_B29EDE2FC8776F01 (mail_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', transaction_set_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', account VARCHAR(255) NOT NULL, voltooid TINYINT(1) NOT NULL, opmerking VARCHAR(255) DEFAULT NULL, INDEX IDX_723705D166867F58 (transaction_set_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction_set (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', bedrag NUMERIC(5, 2) NOT NULL, activiteit_naam VARCHAR(255) NOT NULL, datum DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE reciever ADD CONSTRAINT FK_B29EDE2FC8776F01 FOREIGN KEY (mail_id) REFERENCES mail (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D166867F58 FOREIGN KEY (transaction_set_id) REFERENCES transaction_set (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reciever DROP FOREIGN KEY FK_B29EDE2FC8776F01');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D166867F58');
        $this->addSql('DROP TABLE declaration');
        $this->addSql('DROP TABLE mail');
        $this->addSql('DROP TABLE reciever');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE transaction_set');
    }
}
