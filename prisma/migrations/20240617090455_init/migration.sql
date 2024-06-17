/*
  Warnings:

  - You are about to drop the `Placeholder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Placeholder";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BlogCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    CONSTRAINT "Blog_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "BlogCollection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
