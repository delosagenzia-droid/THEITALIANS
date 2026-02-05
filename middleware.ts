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

    // 3. Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Security: Only allow specific Admin UID
        const ADMIN_UID = '13e1a9ca-6460-4e45-a027-780d66622163';
        if (user.id !== ADMIN_UID) {
            // Redirect unauthorized users to home or show error
            return NextResponse.redirect(new URL('/', request.url));
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
