-- CreateEnum
CREATE TYPE "ScheduleTypes" AS ENUM ('Today', 'Tomorrow', 'ThisWeek');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "schedule" "ScheduleTypes" NOT NULL DEFAULT 'Today',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedAt" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
