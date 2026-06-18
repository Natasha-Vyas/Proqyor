import { ExecArgs } from '@medusajs/framework/types'
import { Modules } from '@medusajs/framework/utils'
import * as XLSX from 'xlsx'

export default async function fixCategories({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT)

  const filePath = 'C:/Users/natas/Downloads/Product List - Final (1).xlsx'
  const wb = XLSX.readFile(filePath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]
  const dataRows = rows.slice(2)

  // Build mapping: Product Family -> [Categories]
  const familyToCategories = new Map<string, Set<string>>()
  dataRows.forEach(r => {
    const family = r[1]
    const category = r[2]
    if (family && category) {
      if (!familyToCategories.has(family)) familyToCategories.set(family, new Set())
      familyToCategories.get(family)!.add(category)
    }
  })

  console.log('Family -> Category mapping:')
  familyToCategories.forEach((cats, family) => {
    console.log(`  ${family}: ${cats.size} categories`)
  })

  // Create parent categories (Product Families)
  const familyIdMap = new Map<string, string>()
  for (const family of familyToCategories.keys()) {
    const handle = family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    try {
      const [existing] = await productService.listProductCategories({ handle })
      if (existing) {
        familyIdMap.set(family, existing.id)
        console.log(`  Family "${family}" already exists: ${existing.id}`)
      } else {
        const created = await productService.createProductCategories({
          name: family,
          handle,
          is_active: true,
        })
        familyIdMap.set(family, created.id)
        console.log(`  Created family "${family}": ${created.id}`)
      }
    } catch (e: any) {
      console.log(`  Error creating family "${family}": ${e.message?.slice(0, 80)}`)
    }
  }

  // Now update subcategories to have parent
  for (const [family, categories] of familyToCategories) {
    const parentId = familyIdMap.get(family)
    if (!parentId) continue

    for (const catName of categories) {
      const catHandle = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      try {
        const [cat] = await productService.listProductCategories({ handle: catHandle })
        if (cat && !cat.parent_category_id) {
          await productService.updateProductCategories(cat.id, {
            parent_category_id: parentId,
          })
          console.log(`    Set "${catName}" under "${family}"`)
        }
      } catch (e: any) {
        console.log(`    Error updating "${catName}": ${e.message?.slice(0, 80)}`)
      }
    }
  }

  console.log('\nCategory hierarchy updated!')
}
