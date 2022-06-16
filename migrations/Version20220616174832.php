<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220616174832 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction_group ADD bank_account_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\'');
        $this->addSql('ALTER TABLE transaction_group ADD CONSTRAINT FK_CCF3948512CB990C FOREIGN KEY (bank_account_id) REFERENCES `BankAccount` (id)');
        $this->addSql('CREATE INDEX IDX_CCF3948512CB990C ON transaction_group (bank_account_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction_group DROP FOREIGN KEY FK_CCF3948512CB990C');
        $this->addSql('DROP INDEX IDX_CCF3948512CB990C ON transaction_group');
        $this->addSql('ALTER TABLE transaction_group DROP bank_account_id');
    }
}
