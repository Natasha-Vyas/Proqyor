import { defineMiddlewares } from '@medusajs/framework/http'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

export default defineMiddlewares({
  routes: [
    {
      matcher: '/store/uploads',
      method: 'POST',
      middlewares: [upload.array('files')],
    },
  ],
})
