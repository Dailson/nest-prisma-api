BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tb_file] (
    [id] INT NOT NULL IDENTITY(1,1),
    [file_name] VARCHAR(255) NOT NULL,
    [content_length] INT NOT NULL,
    [content_type] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_file_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [tb_file_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tb_file_file_name_key] UNIQUE NONCLUSTERED ([file_name])
);

-- AddForeignKey
ALTER TABLE [dbo].[tb_file] ADD CONSTRAINT [tb_file_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[tb_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
