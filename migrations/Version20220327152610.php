<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220327152610 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mail (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', person_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', title VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, sender VARCHAR(255) NOT NULL, sent_at DATETIME NOT NULL, INDEX IDX_5126AC48217BBB47 (person_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE person (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', sub VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, given_name VARCHAR(180) NOT NULL, family_name VARCHAR(180) NOT NULL, address VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_34DCD176580282DC (sub), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recipient (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', person_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', mail CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', INDEX IDX_6804FB49217BBB47 (person_id), INDEX IDX_6804FB495126AC48 (mail), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE statement (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', name VARCHAR(255) NOT NULL, iban VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, item VARCHAR(255) NOT NULL, reason VARCHAR(255) NOT NULL, `group` LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', comment LONGTEXT NOT NULL, feedback LONGTEXT NOT NULL, status VARCHAR(255) NOT NULL, amount INT NOT NULL, image_name VARCHAR(255) DEFAULT NULL, image_size INT DEFAULT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', person_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', transaction_group_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', status VARCHAR(255) NOT NULL, comment LONGTEXT DEFAULT NULL, INDEX IDX_723705D1217BBB47 (person_id), INDEX IDX_723705D1B026F02F (transaction_group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction_group (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', amount INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, date DATETIME NOT NULL, iban VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE mail ADD CONSTRAINT FK_5126AC48217BBB47 FOREIGN KEY (person_id) REFERENCES person (id)');
        $this->addSql('ALTER TABLE recipient ADD CONSTRAINT FK_6804FB49217BBB47 FOREIGN KEY (person_id) REFERENCES person (id)');
        $this->addSql('ALTER TABLE recipient ADD CONSTRAINT FK_6804FB495126AC48 FOREIGN KEY (mail) REFERENCES mail (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1217BBB47 FOREIGN KEY (person_id) REFERENCES person (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1B026F02F FOREIGN KEY (transaction_group_id) REFERENCES transaction_group (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recipient DROP FOREIGN KEY FK_6804FB495126AC48');
        $this->addSql('ALTER TABLE mail DROP FOREIGN KEY FK_5126AC48217BBB47');
        $this->addSql('ALTER TABLE recipient DROP FOREIGN KEY FK_6804FB49217BBB47');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1217BBB47');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1B026F02F');
        $this->addSql('DROP TABLE mail');
        $this->addSql('DROP TABLE person');
        $this->addSql('DROP TABLE recipient');
        $this->addSql('DROP TABLE statement');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE transaction_group');
    }
}
