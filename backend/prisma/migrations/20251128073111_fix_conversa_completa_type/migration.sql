-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "conversaCompleta" DROP NOT NULL,
ALTER COLUMN "conversaCompleta" DROP DEFAULT,
ALTER COLUMN "conversaCompleta" SET DATA TYPE TEXT;
