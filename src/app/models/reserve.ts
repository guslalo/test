// reserve
export class date { 
  month: any;
  year: any;
  day: any;
}

export class reserve {
  constructor(
    public professionalDetails: {
      userId: string;
      specialtyId: string;
    },
    public dateDetails: {
      date:date;
      start:any;
    }
  ) {}
 
}
