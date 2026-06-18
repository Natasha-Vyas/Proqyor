import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { SUBMISSION_MODULE } from '../../../modules/submission'

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const submissionService = req.scope.resolve(SUBMISSION_MODULE)

  const body = req.body as {
    type: string
    name?: string
    company?: string
    contact_person?: string
    phone?: string
    category?: string
    message?: string
    product?: string
    sku?: string
    quantity?: string
    document_type?: string
    files?: string
    notes?: string
  }

  const submission = await submissionService.createSubmissions({
    type: body.type,
    name: body.name || null,
    company: body.company || null,
    contact_person: body.contact_person || null,
    phone: body.phone || null,
    category: body.category || null,
    message: body.message || null,
    product: body.product || null,
    sku: body.sku || null,
    quantity: body.quantity || null,
    document_type: body.document_type || null,
    files: body.files || null,
    notes: body.notes || null,
  })

  res.status(201).json({ submission })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const submissionService = req.scope.resolve(SUBMISSION_MODULE)
  const submissions = await submissionService.listSubmissions()
  res.json({ submissions })
}
