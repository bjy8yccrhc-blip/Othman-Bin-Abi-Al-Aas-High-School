import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const aboutContentTable = pgTable("about_content", {
  id: serial("id").primaryKey(),
  schoolName: text("school_name").notNull(),
  tagline: text("tagline").notNull(),
  history: text("history").notNull(),
  mission: text("mission").notNull(),
  vision: text("vision").notNull(),
  principalName: text("principal_name").notNull(),
  principalMessage: text("principal_message").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  address: text("address").notNull(),
  heroImageUrl: text("hero_image_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type AboutContent = typeof aboutContentTable.$inferSelect;
