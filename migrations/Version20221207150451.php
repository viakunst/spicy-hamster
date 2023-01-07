<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221207150451 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Changed a entity field name';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `Transaction` RENAME INDEX idx_f4ab8a06217bbb47 TO IDX_723705D1217BBB47');
        $this->addSql('ALTER TABLE `Transaction` RENAME INDEX idx_f4ab8a06b026f02f TO IDX_723705D1B026F02F');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `Transaction` RENAME INDEX idx_723705d1217bbb47 TO IDX_F4AB8A06217BBB47');
        $this->addSql('ALTER TABLE `Transaction` RENAME INDEX idx_723705d1b026f02f TO IDX_F4AB8A06B026F02F');
    }
}
