<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220209212522 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE lokaal_persoon (id INT AUTO_INCREMENT NOT NULL, naam VARCHAR(255) NOT NULL, mail_adres VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mail (id INT AUTO_INCREMENT NOT NULL, persoon_id INT NOT NULL, titel VARCHAR(255) NOT NULL, inhoud VARCHAR(255) NOT NULL, verzender VARCHAR(255) NOT NULL, zend_tijd DATETIME NOT NULL, INDEX IDX_5126AC4890FBB45F (persoon_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ontvanger (id INT AUTO_INCREMENT NOT NULL, lokaal_persoon_id INT NOT NULL, mail_id INT NOT NULL, INDEX IDX_F15C7E2C73AB7E84 (lokaal_persoon_id), INDEX IDX_F15C7E2CC8776F01 (mail_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transactie (id INT AUTO_INCREMENT NOT NULL, lokaal_persoon_id INT NOT NULL, transactie_groep_id INT NOT NULL, voltooid TINYINT(1) NOT NULL, opmerking VARCHAR(255) DEFAULT NULL, INDEX IDX_DFDDCD9073AB7E84 (lokaal_persoon_id), INDEX IDX_DFDDCD90B23ED702 (transactie_groep_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transactie_groep (id INT AUTO_INCREMENT NOT NULL, bedrag NUMERIC(5, 2) NOT NULL, activiteit_naam VARCHAR(255) NOT NULL, datum DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE mail ADD CONSTRAINT FK_5126AC4890FBB45F FOREIGN KEY (persoon_id) REFERENCES lokaal_persoon (id)');
        $this->addSql('ALTER TABLE ontvanger ADD CONSTRAINT FK_F15C7E2C73AB7E84 FOREIGN KEY (lokaal_persoon_id) REFERENCES lokaal_persoon (id)');
        $this->addSql('ALTER TABLE ontvanger ADD CONSTRAINT FK_F15C7E2CC8776F01 FOREIGN KEY (mail_id) REFERENCES mail (id)');
        $this->addSql('ALTER TABLE transactie ADD CONSTRAINT FK_DFDDCD9073AB7E84 FOREIGN KEY (lokaal_persoon_id) REFERENCES lokaal_persoon (id)');
        $this->addSql('ALTER TABLE transactie ADD CONSTRAINT FK_DFDDCD90B23ED702 FOREIGN KEY (transactie_groep_id) REFERENCES transactie_groep (id)');
        $this->addSql('DROP TABLE bedelaar');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mail DROP FOREIGN KEY FK_5126AC4890FBB45F');
        $this->addSql('ALTER TABLE ontvanger DROP FOREIGN KEY FK_F15C7E2C73AB7E84');
        $this->addSql('ALTER TABLE transactie DROP FOREIGN KEY FK_DFDDCD9073AB7E84');
        $this->addSql('ALTER TABLE ontvanger DROP FOREIGN KEY FK_F15C7E2CC8776F01');
        $this->addSql('ALTER TABLE transactie DROP FOREIGN KEY FK_DFDDCD90B23ED702');
        $this->addSql('CREATE TABLE bedelaar (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, roles JSON NOT NULL, UNIQUE INDEX UNIQ_16DD0DC6E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE lokaal_persoon');
        $this->addSql('DROP TABLE mail');
        $this->addSql('DROP TABLE ontvanger');
        $this->addSql('DROP TABLE transactie');
        $this->addSql('DROP TABLE transactie_groep');
    }
}
