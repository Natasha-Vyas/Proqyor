import { model } from '@medusajs/framework/utils'

const Submission = model.define('submission', {
  id: model.id().primaryKey(),
  type: model.text(),
  name: model.text().nullable(),
  company: model.text().nullable(),
  contact_person: model.text().nullable(),
  phone: model.text().nullable(),
  category: model.text().nullable(),
  message: model.text().nullable(),
  product: model.text().nullable(),
  sku: model.text().nullable(),
  quantity: model.text().nullable(),
  document_type: model.text().nullable(),
  files: model.text().nullable(),
  notes: model.text().nullable(),
  status: model.text().default('new'),
})

export default Submission
