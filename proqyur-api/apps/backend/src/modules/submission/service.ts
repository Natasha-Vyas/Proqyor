import { MedusaService } from '@medusajs/framework/utils'
import Submission from './models/submission'

class SubmissionModuleService extends MedusaService({ Submission }) {}

export default SubmissionModuleService
