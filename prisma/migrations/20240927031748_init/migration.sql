-- CreateTable
CREATE TABLE "HistoricalEvent" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "event" TEXT NOT NULL,

    CONSTRAINT "HistoricalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WikiHistoricalEvent" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "thumbnail_url" TEXT,

    CONSTRAINT "WikiHistoricalEvent_pkey" PRIMARY KEY ("id")
);
