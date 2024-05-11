BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tb_article] DROP CONSTRAINT [tb_article_author_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[tb_article] ALTER COLUMN [author_id] INT NULL;
ALTER TABLE [dbo].[tb_article] ADD CONSTRAINT [tb_article_is_published_df] DEFAULT 0 FOR [is_published];

-- AlterTable
ALTER TABLE [dbo].[tb_user] ADD [last_name] VARCHAR(255);

-- AddForeignKey
ALTER TABLE [dbo].[tb_article] ADD CONSTRAINT [tb_article_author_id_fkey] FOREIGN KEY ([author_id]) REFERENCES [dbo].[tb_user]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
