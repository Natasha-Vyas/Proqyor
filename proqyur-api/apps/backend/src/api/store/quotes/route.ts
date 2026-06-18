import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { QUOTE_MODULE } from '../../../modules/quote'

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const quoteService = req.scope.resolve(QUOTE_MODULE)

  const { company_name, contact_person, phone, document_type, file_urls, notes } = req.body as {
    company_name: string
    contact_person: string
    phone: string
    document_type: string
    file_urls?: string[]
    notes?: string
  }

  const quote = await quoteService.createQuotes({
    company_name,
    contact_person,
    phone,
    document_type,
    file_urls: file_urls || [],
    notes: notes || null,
  })

  res.status(201).json({ quote })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const quoteService = req.scope.resolve(QUOTE_MODULE)
  const quotes = await quoteService.listQuotes()
  res.json({ quotes })
}
