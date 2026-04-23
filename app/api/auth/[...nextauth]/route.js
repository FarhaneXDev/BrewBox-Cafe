// app/api/auth/[...nextauth]/route.js
import { handlers } from '@/lib/auth.js'

export const { GET, POST } = handlers
