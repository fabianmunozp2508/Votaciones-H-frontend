
export class Usuario {

    constructor(
      public nombre: string,
      public email: string,
      public role:'ADMIN_ROLE' | 'USER_ROLE',
      public voto:boolean,
      public publicado:boolean,
      public password?: string,
      public img?: string,
      public facebook?: boolean,
      public uid?: string,
    ) {}
}
