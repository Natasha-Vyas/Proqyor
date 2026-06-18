import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260618090934 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "submission" ("id" text not null, "type" text check ("type" in ('contact', 'product_quote', 'document')) not null, "name" text null, "company" text null, "contact_person" text null, "phone" text null, "category" text null, "message" text null, "product" text null, "sku" text null, "quantity" text null, "document_type" text null, "files" text null, "notes" text null, "status" text check ("status" in ('new', 'reviewed', 'responded')) not null default 'new', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "submission_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_submission_deleted_at" ON "submission" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "submission" cascade;`);
  }

}
