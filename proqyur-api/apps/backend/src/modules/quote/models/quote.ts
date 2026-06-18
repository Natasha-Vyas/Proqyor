import { model } from '@medusajs/framework/utils'

const Quote = model.define('quote', {
  id: model.id().primaryKey(),
  company_name: model.text(),
  contact_person: model.text(),
  phone: model.text(),
  document_type: model.enum(['drawings', 'boq', 'specs', 'mixed', 'other']),
  status: model.enum(['pending', 'reviewed', 'quoted', 'accepted', 'rejected']).default('pending'),
  notes: model.text().nullable(),
  file_urls: model.array().default([]),
})

export default Quote
