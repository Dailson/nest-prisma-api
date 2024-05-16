/*
  Warnings:

  - You are about to drop the column `last_name` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tb_user` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tb_user] DROP COLUMN [last_name],
[name];
ALTER TABLE [dbo].[tb_user] ADD [full_name] VARCHAR(255) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
