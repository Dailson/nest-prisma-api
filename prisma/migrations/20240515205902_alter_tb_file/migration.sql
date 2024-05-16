BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[tb_file] DROP CONSTRAINT [tb_file_file_name_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
