import { Module } from '@medusajs/framework/utils'
import SubmissionModuleService from './service'

export const SUBMISSION_MODULE = 'submission'

export default Module(SUBMISSION_MODULE, { service: SubmissionModuleService })
