
export class Usuario {

    constructor(
      public nombre?: string,
      public email?: string,
      public password?: string,
      public img?: string,
      public voto?:boolean,
      public publicado?:boolean,
      public role?:'ADMIN_ROLE' | 'USER_ROLE',
      public facebook_id?: boolean,
      public provider_id?: string,
      public google?: boolean,
      public uid?: string,
    ) {}
}




