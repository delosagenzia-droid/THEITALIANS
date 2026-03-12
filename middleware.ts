import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 1. Initialize Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // 2. Check auth
    const { data: { user } } = await supabase.auth.getUser()

    if (
        request.nextUrl.pathname.startsWith('/admin/dashboard') || 
        request.nextUrl.pathname.startsWith('/admin/crm') ||
        request.nextUrl.pathname.startsWith('/admin/riccardo') ||
        request.nextUrl.pathname.startsWith('/admin/collaborations')
    ) {
        if (!user) {
            const redirectUrl = new URL('/admin/login', request.url)
            redirectUrl.searchParams.set('next', request.nextUrl.pathname)
            return NextResponse.redirect(redirectUrl)
        }
    }

    // 4. Redirect logged-in users away from login
    if (request.nextUrl.pathname.startsWith('/admin/login')) {
        if (user) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
}
