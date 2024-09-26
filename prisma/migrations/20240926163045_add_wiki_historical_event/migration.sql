-- CreateTable
CREATE TABLE "WikiHistoricalEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "thumbnail_url" TEXT
);
