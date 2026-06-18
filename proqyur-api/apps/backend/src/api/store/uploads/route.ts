import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import * as fs from 'fs'
import * as path from 'path'

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const files = (req as any).files as Express.Multer.File[]

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files provided' })
  }

  const uploadDir = path.join(process.cwd(), 'static')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const results = files.map((file) => {
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
    const filepath = path.join(uploadDir, filename)
    fs.writeFileSync(filepath, file.buffer)
    return {
      id: filename,
      url: `http://localhost:9000/static/${filename}`,
      name: file.originalname,
    }
  })

  res.status(200).json({ files: results })
}
