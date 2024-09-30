-- CreateTable
CREATE TABLE "Invention" (
    "id" SERIAL NOT NULL,
    "year" INTEGER,
    "event" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "extract" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invention_year_event_key" ON "Invention"("year", "event");
