interface AuthRequest {
    loginId: string
    password: string
}

/**
 * Basic Auth Response
 * @interface
 */
interface AuthResponse {
    access: string
    refresh: string
}