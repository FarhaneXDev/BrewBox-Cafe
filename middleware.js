// middleware.js
import { auth } from '@/lib/auth.js'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isBackstageRoute = pathname.startsWith('/backstage')
  const isLoginPage = pathname === '/backstage/login'

  if (isBackstageRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/backstage/login', req.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/backstage', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/backstage/:path*'],
}