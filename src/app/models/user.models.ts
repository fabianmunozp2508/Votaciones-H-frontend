export interface UsuarioI{
         nombre: string,
         email: string,
         password?: string,
         img?: string,
         facebook?: boolean,
         role?:'ADMIN_ROLE' | 'USER_ROLE',
         uid?: string,
}
