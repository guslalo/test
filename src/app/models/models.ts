import {
  userPolicies,
  profilePolicies,
  appointmentPolicies,
  availabilitiesPolicies,
  waitingRoomPolicies,
  clinicPolicies,
  reportPolicies,
  medicalRecordPolicies,
} from 'src/app/models/profile';

export class UsersLogin {
  users: [UserLogin];
}

export class AdministrativeData {
  role: string;
}

// cliente
export class UserLogin {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public lastName: string,
    public access_token: string,
    public expires_in: string,
    public internalCode: number,
    public administrativeData: [AdministrativeData],
    public administrativeDataContext: string,
    public role?: string,
    public policies?: {
      userPolicies?: userPolicies;
      profilePolicies?: profilePolicies;
      appointmentPolicies?: appointmentPolicies;
      availabilitiesPolicies?: availabilitiesPolicies;
      waitingRoomPolicies?: waitingRoomPolicies;
      clinicPolicies?: clinicPolicies;
      reportPolicies?: reportPolicies;
      medicalRecordPolicies?: medicalRecordPolicies;
    }
  ) {}

  // cliente

  /*
  id:number;
  type:string;
  email:string;
  name:string;*/
}
