export class UsersLogin {
  users:[UserLogin];
}

// cliente
export class UserLogin {
  constructor(
    public id:number,
    public type:string,
    public role:string,
    public username:string,
    public email:string,
    public name:string,
    public image:string
    ){

}




  // cliente


  /*
  id:number;
  type:string;
  email:string;
  name:string;*/
}
