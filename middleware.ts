import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. On laisse passer les stats et les fichiers statiques
  if (
    pathname.startsWith('/stats') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Gestion des variantes (gite, domaine, etc.)
  // On "rewrite" (réécriture interne) vers la racine en gardant l'URL propre
  const variants = ['/infos-camping-car', '/infos-domaine', '/infos-logistique', '/guten-rutsch']
  if (variants.includes(pathname)) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  // 3. Anciennes invitations ou pages inconnues -> Redirection vers /
  if (pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}