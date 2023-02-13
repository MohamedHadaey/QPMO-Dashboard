export interface ProjectDetails {
  Success: boolean
  data?: Data
  Error_Resp: any
  Code: number
}

export interface Data {
  ID: number
  Project_Name: string
  Project_Location: string
  Project_ProjectPeriod: number
  Project_ManPower: number
  Project_EndDate: any
  Project_User: ProjectUser
  Project_Maqawl: ProjectMaqawl
  Project_Category: ProjectCategory
  Project_Status: ProjectStatus
  Project_User_Percentage: number
  Project_Maqawl_Percentage: number
  Project_Images: any[]
}

export interface ProjectUser {
  User_Id: number
  User_UserName: string
  User_PasswordChanged: boolean
  User_Name: string
  User_Phone: string
  User_JobTitle: string
  User_Address: string
  User_Department: string
  User_Enabled: boolean
}

export interface ProjectMaqawl {
  Maqawl_Id: number
  Maqawl_Name: string
  Maqawl_TaxRecord: string
  Maqawl_Phone: string
  Maqawl_UserName: string
  Maqawl_PasswordChanged: boolean
  Maqawl_CompanyId: number
  Maqawl_Enabled: boolean
}

export interface ProjectCategory {
  ProjectCat_Id: number
  ProjectCat_Name: string
  ProjectCat_Enabled: boolean
}

export interface ProjectStatus {
  Status_Id: number
  Status_Name: string
  Status_ColorImagePath: string
  Status_Enabled: boolean
  Status_Desc: string
}



