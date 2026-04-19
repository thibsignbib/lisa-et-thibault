// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. On laisse passer la page stats et tes variantes "en dur"
  const allowedPaths = ['/stats', '/infos-camping-car', '/infos-domaine', 'infos-logistique', '/guten-rutsch'] 
  if (allowedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 2. On laisse passer le système Next et les images
  if (pathname.startsWith('/_next') || pathname.includes('.') || pathname === '/') {
    return NextResponse.next()
  }

  // 3. Tout le reste (vieilles invitations) -> Home
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/:path*'],
}