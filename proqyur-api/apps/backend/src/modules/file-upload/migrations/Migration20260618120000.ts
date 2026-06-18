import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260618120000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "file_upload" ("id" text not null, "original_name" text not null, "mime_type" text not null, "size" integer not null, "data" text not null, "submission_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "file_upload_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_file_upload_deleted_at" ON "file_upload" ("deleted_at") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_file_upload_submission_id" ON "file_upload" ("submission_id") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "file_upload" cascade;`);
  }

}
