-- CreateTable
CREATE TABLE "WikiHistoricalEvent" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "extract" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WikiHistoricalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WikiHistoricalEvent_year_month_day_event_key" ON "WikiHistoricalEvent"("year", "month", "day", "event");

