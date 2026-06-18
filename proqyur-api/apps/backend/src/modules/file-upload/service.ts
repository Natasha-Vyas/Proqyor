import { MedusaService } from '@medusajs/framework/utils'
import FileUpload from './models/file-upload'

class FileUploadModuleService extends MedusaService({ FileUpload }) {}

export default FileUploadModuleService
