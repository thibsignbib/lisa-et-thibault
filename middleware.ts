// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. On laisse passer la page stats sans condition
  if (pathname.startsWith('/stats')) {
    return NextResponse.next()
  }

  // 2. On redirige les invitations vers la home
  if (pathname.startsWith('/invitation')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 3. Optionnel : Rediriger les 404 connues ou autres pages inutiles vers la home
  // On évite ainsi que les gens se perdent
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * On applique le middleware sur tout, sauf les assets statiques
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)',
  ],
}
