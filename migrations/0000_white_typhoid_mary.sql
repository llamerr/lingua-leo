CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"language" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors_names" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"language" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors_to_works" (
	"author_id" integer NOT NULL,
	"work_id" integer NOT NULL,
	CONSTRAINT "authors_to_works_author_id_work_id_pk" PRIMARY KEY("author_id","work_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editions" (
	"id" serial PRIMARY KEY NOT NULL,
	"work_id" integer NOT NULL,
	"isbn" text NOT NULL,
	"language" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editions_to_authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"edition_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "works" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "works_to_works" (
	"parent_work_id" integer NOT NULL,
	"child_work_id" integer NOT NULL,
	CONSTRAINT "works_to_works_parent_work_id_child_work_id_pk" PRIMARY KEY("parent_work_id","child_work_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authors_details" ADD CONSTRAINT "authors_details_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authors_names" ADD CONSTRAINT "authors_names_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authors_to_works" ADD CONSTRAINT "authors_to_works_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authors_to_works" ADD CONSTRAINT "authors_to_works_work_id_works_id_fk" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editions" ADD CONSTRAINT "editions_work_id_works_id_fk" FOREIGN KEY ("work_id") REFERENCES "works"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editions_to_authors" ADD CONSTRAINT "editions_to_authors_edition_id_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "editions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "editions_to_authors" ADD CONSTRAINT "editions_to_authors_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "works_to_works" ADD CONSTRAINT "works_to_works_parent_work_id_works_id_fk" FOREIGN KEY ("parent_work_id") REFERENCES "works"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "works_to_works" ADD CONSTRAINT "works_to_works_child_work_id_works_id_fk" FOREIGN KEY ("child_work_id") REFERENCES "works"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
