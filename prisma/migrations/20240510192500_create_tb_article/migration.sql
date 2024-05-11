BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tb_article] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255),
    [body] NVARCHAR(1000) NOT NULL,
    [is_published] BIT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_article_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [author_id] INT NOT NULL,
    CONSTRAINT [tb_article_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tb_article_title_key] UNIQUE NONCLUSTERED ([title])
);

-- AddForeignKey
ALTER TABLE [dbo].[tb_article] ADD CONSTRAINT [tb_article_author_id_fkey] FOREIGN KEY ([author_id]) REFERENCES [dbo].[tb_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
