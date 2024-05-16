/*
  Warnings:

  - You are about to drop the column `photo_url` on the `tb_user` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tb_user] DROP COLUMN [photo_url];
ALTER TABLE [dbo].[tb_user] ADD [photo] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
