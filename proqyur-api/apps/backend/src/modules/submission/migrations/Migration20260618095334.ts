import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260618095334 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "submission" drop constraint if exists "submission_type_check";`);
    this.addSql(`alter table if exists "submission" drop constraint if exists "submission_status_check";`);

    this.addSql(`alter table if exists "submission" alter column "type" type text using ("type"::text);`);
    this.addSql(`alter table if exists "submission" alter column "status" type text using ("status"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "submission" add constraint "submission_type_check" check("type" in ('contact', 'product_quote', 'document'));`);
    this.addSql(`alter table if exists "submission" add constraint "submission_status_check" check("status" in ('new', 'reviewed', 'responded'));`);
  }

}
