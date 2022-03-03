import { Usuario } from "./usuario.models";

export class Image {
    static filename: any;
  image: any;
    constructor(
     public usuario:Usuario,
     public title: string,
     public description: string,
     public likes:string,
     public views:string,
     public vote:string,
     public publicado:boolean,
     public uid: string,
     public timestamp:string,
     public filename?:string,
     public _id?: string,

    ){}

    }

    export class Image2 {
      constructor(
       public usuario:Usuario,
       public title: string,
       public description: string,
       public likes:string,
       public views:string,
       public vote:string,
       public uid: string,
       public timestamp:string,
       public filename?:string,
       public _id?: string,
      ){}

      }
