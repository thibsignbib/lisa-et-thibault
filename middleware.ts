// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. On laisse passer la page stats absolument
  if (pathname.startsWith('/stats')) {
    return NextResponse.next()
  }

  // 2. On laisse passer les fichiers internes de Next.js (le moteur du site)
  // et les fichiers dans le dossier /public (images, favicon)
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('.') || // capture .png, .ico, .jpg, etc.
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // 3. TOUT le reste (vieilles invitations, pages au hasard comme /loulou)
  // est redirigé vers la home
  return NextResponse.redirect(new URL('/', request.url))
}

// Le matcher doit être très large pour que le middleware lise toutes les URLs
export const config = {
  matcher: ['/:path*'],
}
