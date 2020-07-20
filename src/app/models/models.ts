export class UsersLogin {
  users:[UserLogin];
}

// cliente
export class UserLogin {
  constructor(
    public id:number,
    public role:string,
    public email:string,
    public name:string,
    public lastName:string,
    public access_token:string,
    public expires_in:string
    ){

}


  // cliente


  /*
  id:number;
  type:string;
  email:string;
  name:string;*/
}
