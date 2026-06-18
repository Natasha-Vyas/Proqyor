import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { FILE_UPLOAD_MODULE } from '../../../../../modules/file-upload'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const fileUploadService = req.scope.resolve(FILE_UPLOAD_MODULE)

  const files = await fileUploadService.listFileUploads({ id })
  if (!files || files.length === 0) {
    return res.status(404).json({ message: 'File not found' })
  }

  const file = files[0]
  const buffer = Buffer.from(file.data, 'base64')

  res.set({
    'Content-Type': file.mime_type,
    'Content-Disposition': `attachment; filename="${file.original_name}"`,
    'Content-Length': buffer.length.toString(),
  })
  res.send(buffer)
}
