import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { FILE_UPLOAD_MODULE } from '../../../modules/file-upload'

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const files = (req as any).files as Express.Multer.File[]

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files provided' })
  }

  const fileUploadService = req.scope.resolve(FILE_UPLOAD_MODULE)

  const results = []
  for (const file of files) {
    const base64Data = file.buffer.toString('base64')
    const record = await fileUploadService.createFileUploads({
      original_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      data: base64Data,
      submission_id: null,
    })
    results.push({
      id: record.id,
      url: `${req.protocol}://${req.get('host')}/files/${record.id}`,
      name: file.originalname,
    })
  }

  res.status(200).json({ files: results })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const fileUploadService = req.scope.resolve(FILE_UPLOAD_MODULE)
  const files = await fileUploadService.listFileUploads({}, { select: ['id', 'original_name', 'mime_type', 'size', 'submission_id', 'created_at'] })
  res.json({ files })
}
