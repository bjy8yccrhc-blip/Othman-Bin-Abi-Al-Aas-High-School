import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: date("date").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Activity = typeof activitiesTable.$inferSelect;
