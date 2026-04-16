-- AlterTable
ALTER TABLE "User" ADD COLUMN     "businessDescription" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessUrl" TEXT,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "targetAudience" TEXT,
ADD COLUMN     "tone" TEXT DEFAULT 'neutral';
