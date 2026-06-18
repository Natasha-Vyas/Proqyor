import { ExecArgs } from '@medusajs/framework/types'
import { Modules } from '@medusajs/framework/utils'
import * as XLSX from 'xlsx'
import * as path from 'path'

export default async function importProducts({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT)

  const filePath = path.resolve('C:/Users/natas/Downloads/Product List - Final (1).xlsx')
  const wb = XLSX.readFile(filePath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]

  // Row 0 is ['i'], Row 1 is headers, Row 2+ is data
  const headers = rows[1]
  const dataRows = rows.slice(2)

  console.log(`Found ${dataRows.length} products to import`)

  // Create categories from unique Category values
  const categoryMap = new Map<string, string>()
  const uniqueCategories = [...new Set(dataRows.map(r => r[2]).filter(Boolean))]

  console.log(`Creating ${uniqueCategories.length} categories...`)
  for (const catName of uniqueCategories) {
    try {
      const handle = catName.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      const [existing] = await productService.listProductCategories({ handle })
      if (existing) {
        categoryMap.set(catName, existing.id)
      } else {
        const created = await productService.createProductCategories({
          name: catName,
          handle,
          is_active: true,
        })
        categoryMap.set(catName, created.id)
      }
    } catch (e: any) {
      console.log(`  Category "${catName}" skipped: ${e.message}`)
    }
  }
  console.log(`Created/found ${categoryMap.size} categories`)

  // Import products in batches
  let imported = 0
  let skipped = 0
  const batchSize = 20

  for (let i = 0; i < dataRows.length; i += batchSize) {
    const batch = dataRows.slice(i, i + batchSize)

    for (const row of batch) {
      const sku = row[0]
      const productFamily = row[1] || ''
      const category = row[2] || ''
      const subcategory = row[3] || ''
      const productName = row[4]
      const brand = row[5] || ''
      const productType = row[6] || ''
      const primaryMaterial = row[7] || ''
      const materialDetail = row[8] || ''
      const grade = row[9] || ''
      const standards = row[10] || ''
      const dimensions = row[11] || ''
      const thickness = row[12] || ''
      const frameDepth = row[13] || ''
      const maxWidth = row[14] || ''
      const maxHeight = row[15] || ''
      const glazing = row[16] || ''
      const openingStyle = row[17] || ''
      const lockingSystem = row[18] || ''
      const thermalBreak = row[19] || ''
      const finish = row[20] || ''
      const mountingType = row[21] || ''
      const shape = row[22] || ''
      const flushVolume = row[23] || ''
      const techSpecs = row[24] || ''
      const description = row[25] || ''

      if (!productName || !sku) {
        skipped++
        continue
      }

      try {
        const handle = `${sku}-${productName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')

        // Build metadata from all extra fields
        const metadata: Record<string, any> = {}
        if (productFamily) metadata.product_family = productFamily
        if (subcategory) metadata.subcategory = subcategory
        if (brand) metadata.brand = brand
        if (productType) metadata.product_type = productType
        if (primaryMaterial) metadata.primary_material = primaryMaterial
        if (materialDetail) metadata.material_detail = materialDetail
        if (grade) metadata.grade = grade
        if (standards) metadata.standards = standards
        if (dimensions) metadata.dimensions = dimensions
        if (thickness) metadata.thickness = thickness
        if (frameDepth) metadata.frame_depth = frameDepth
        if (maxWidth) metadata.max_width = maxWidth
        if (maxHeight) metadata.max_height = maxHeight
        if (glazing) metadata.glazing = glazing
        if (openingStyle) metadata.opening_style = openingStyle
        if (lockingSystem) metadata.locking_system = lockingSystem
        if (thermalBreak) metadata.thermal_break = thermalBreak
        if (finish) metadata.finish = finish
        if (mountingType) metadata.mounting_type = mountingType
        if (shape) metadata.shape = shape
        if (flushVolume) metadata.flush_volume = flushVolume
        if (techSpecs) metadata.tech_specs = techSpecs

        await productService.createProducts({
          title: productName,
          handle,
          description: description || `${productName} — ${primaryMaterial || 'Industrial grade'}`,
          subtitle: subcategory || undefined,
          metadata,
        })

        imported++
      } catch (e: any) {
        console.log(`  Skipped "${productName}" (${sku}): ${e.message?.slice(0, 80)}`)
        skipped++
      }
    }

    console.log(`  Progress: ${Math.min(i + batchSize, dataRows.length)}/${dataRows.length} (imported: ${imported}, skipped: ${skipped})`)
  }

  console.log(`\nImport complete! Imported: ${imported}, Skipped: ${skipped}`)
}
