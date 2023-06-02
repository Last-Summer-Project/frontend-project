interface AuthRequest {
    loginId: string
    password: string
}

interface AuthRefreshRequest {
    refresh: string
}

/**
 * Basic Auth Response
 * @interface
 */
interface AuthResponse {
    access: string
    refresh: string
}