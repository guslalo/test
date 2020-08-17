export interface profile {
  role: string;
  profileName?: string;
  description?: string;
  isActive?: boolean;
  userPolicies?: userPolicies;
  profilePolicies?: profilePolicies;
  appointmentPolicies?: appointmentPolicies;
  availabilitiesPolicies?: availabilitiesPolicies;
  waitingRoomPolicies?: waitingRoomPolicies;
  clinicPolicies?: clinicPolicies;
  reportPolicies?: reportPolicies;
  medicalRecordPolicies?: medicalRecordPolicies;
}

// ADMIN PROFILE
export interface userPolicies {
  create: boolean;
  update: boolean;
  delete: boolean;
  sendInvitation: boolean;
}
export interface profilePolicies {
  create: boolean;
  update: boolean;
  delete: boolean;
}
export interface appointmentPolicies {
  calendar: boolean;
  set: boolean;
  update: boolean;
  delete: boolean;
}
export interface availabilitiesPolicies {
  create: boolean;
  update: boolean;
  delete: boolean;
}
export interface waitingRoomPolicies {
  create: boolean;
  update: boolean;
  delete: boolean;
  set: boolean;
}
export interface clinicPolicies {
  updateInfo: boolean;
  updateDesing: boolean;
  updateNotifications: boolean;
  updateProfessionals: boolean;
  updateSpecialities: boolean;
  updateAppointmentObjective: boolean;
  updateAppointmentModality: boolean;
  updateDocuments: boolean;
}
export interface reportPolicies {
  reportManagement: boolean;
  reportLogs: boolean;
}

// COORDINATOR - PROFESSIONAL
export interface medicalRecordPolicies {
  read: boolean;
  readAppointments: boolean;
  updateAppointments: boolean;
  readAntecedents: boolean;
  updateAntecedents: boolean;
  readExams: boolean;
  viewPrescriptions: boolean;
  attachFiles: boolean;
  createPrescriptions?: boolean;
  createExamOrders?: boolean;
  createMedicalLicenses?: boolean;
}

export class Profile implements profile {
  role: string;
  profileName?: string;
  description?: string;
  userPolicies? = {
    create: true,
    update: true,
    delete: false,
    sendInvitation: false,
  };
  profilePolicies? = {
    create: true,
    update: true,
    delete: false,
  };
  medicalRecordPolicies? = {
    read: true,
    readAppointments: true,
    updateAppointments: false,
    readAntecedents: false,
    updateAntecedents: false,
    readExams: false,
    viewPrescriptions: false,
    attachFiles: false,
    createPerscription: false,
    createExamOrders: false,
    createMedicalLicenses: false,
  };
  appointmentPolicies = {
    calendar: true,
    set: true,
    update: false,
    delete: false,
  };
  availabilitiesPolicies = {
    create: true,
    update: true,
    delete: false,
  };
  waitingRoomPolicies = {
    create: true,
    update: true,
    delete: false,
    set: false,
  };
  clinicPolicies? = {
    updateInfo: true,
    updateDesing: true,
    updateNotifications: false,
    updateProfessionals: false,
    updateSpecialities: false,
    updateAppointmentObjective: false,
    updateAppointmentModality: false,
    updateDocuments: false,
  };
  reportPolicies = {
    reportManagement: true,
    reportLogs: true,
  };
}
