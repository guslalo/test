// registerUser
export class registerUser {
  constructor(
    public personalData: {
      name: string;
      lastName: string;
      gender: string;
      postalCode: string;
      phoneNumber: string;
      email: string;
    },
    public birthData: {
      birthdate: string;
      ufBirth: string;
      municipalityBirth: string;
      nacionality: string;
    },
    public addressData: {
      cep: string;
      uf: string;
      city: string;
      neighborhood: string;
      street: string;
      streetNumber: string;
    },
    public password: string
  ) {}
  /*
{
  "personalData": {
      "name": "name",
      "lastName": "lastName",
      "gender": "M",
      "postalCode": "postalCode",
      "phoneNumber": "phoneNumber",
      "email": "fcomadrida@gmail.com"
  },
  "birthData": {
      "birthdate": "10/02/2000",
      "ufBirth": "Test",
      "municipalityBirth": "Test",
      "nacionality": "Brasil"
  },
  "addressData": {
      "cep": "test",
      "uf": "test",
      "city": "test",
      "neighborhood": "test",
      "street": "test",
      "streetNumber": 1234
  },
  "password": "testtest123"
}
*/

  // cliente

  /*
  id:number;
  type:string;
  email:string;
  name:string;*/
}
