<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220112192935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bedelaar (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_16DD0DC6E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE verzoek (id INT AUTO_INCREMENT NOT NULL, naam VARCHAR(255) NOT NULL, iban VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, item VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, commissie LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', bon VARCHAR(255) NOT NULL, opmerking VARCHAR(255) DEFAULT NULL, akkoord TINYINT(1) NOT NULL, geld NUMERIC(6, 2) NOT NULL, image_name VARCHAR(255) NOT NULL, image_size INT NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE bedelaar');
        $this->addSql('DROP TABLE verzoek');
    }
}
