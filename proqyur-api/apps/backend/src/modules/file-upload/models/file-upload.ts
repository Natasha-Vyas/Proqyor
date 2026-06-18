import { model } from '@medusajs/framework/utils'

const FileUpload = model.define('file_upload', {
  id: model.id().primaryKey(),
  original_name: model.text(),
  mime_type: model.text(),
  size: model.number(),
  data: model.text(),
  submission_id: model.text().nullable(),
})

export default FileUpload
