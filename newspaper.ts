import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const newspaperArticlesTable = pgTable("newspaper_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  coverImageUrl: text("cover_image_url"),
  publishDate: date("publish_date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type NewspaperArticle = typeof newspaperArticlesTable.$inferSelect;
