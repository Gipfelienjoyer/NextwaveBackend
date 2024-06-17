/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Blog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BlogCollection";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User_Table" (
    "User_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Account_Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Account_Updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Appointment" (
    "Appointments_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "User_ID" INTEGER NOT NULL,
    "Appointments_Title" TEXT NOT NULL,
    "Appointments_Description" TEXT,
    "Appointments_Start_Date" DATETIME NOT NULL,
    "Appointments_Finish_Date" DATETIME NOT NULL,
    "Appointments_Start_Time" DATETIME,
    "Appointments_Finish_Time" DATETIME,
    "Appointments_Full_Day" BOOLEAN NOT NULL DEFAULT false,
    "Appointments_Participants" TEXT,
    "Appointments_Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Appointments_Updated" DATETIME NOT NULL,
    CONSTRAINT "Appointment_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User_Table" ("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToDo_List" (
    "ToDo_List_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "User_ID" INTEGER NOT NULL,
    "ToDo_List_Title" TEXT,
    "ToDo_List_Desc" TEXT,
    "ToDo_List_Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ToDo_List_Updated" DATETIME NOT NULL,
    CONSTRAINT "ToDo_List_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User_Table" ("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToDo_Item" (
    "ToDo_Item_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ToDo_List_ID" INTEGER NOT NULL,
    "ToDo_Item_Title" TEXT NOT NULL,
    "ToDo_Item_Description" TEXT,
    "ToDo_Item_Status" TEXT NOT NULL DEFAULT 'Not Started',
    "ToDo_Item_Due_Date" DATETIME,
    "ToDo_Item_Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ToDo_Item_Updated" DATETIME NOT NULL,
    CONSTRAINT "ToDo_Item_ToDo_List_ID_fkey" FOREIGN KEY ("ToDo_List_ID") REFERENCES "ToDo_List" ("ToDo_List_ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Table_Email_key" ON "User_Table"("Email");
