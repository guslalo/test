export class UsersLogin {
  users:[UserLogin];
}

export class AdministrativeData {
  role:string;
}

// cliente
export class UserLogin {
  constructor(
    public id:string,
    public email:string,
    public name:string,
    public lastName:string,
    public access_token:string,
    public expires_in:string,
    public internalCode:number,
    public administrativeData:[AdministrativeData]
    ){

   

}



  // cliente


  /*
  id:number;
  type:string;
  email:string;
  name:string;*/
}
