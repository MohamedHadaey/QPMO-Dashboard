import { Maqawl } from "./maqawl";
import { Status } from "./status";

export class ProjectsTable
    {
        ID:number=0;
        Project_Name:string='';
        Project_ContractCode:string='';
        Project_EndDate?:Date=new Date();
        Maqawl:Maqawl=new Maqawl();
        Project_Maqawl_Percentage:number=0;
        UserProject_User_PercentagePercentage:number=0;
        Status:Status=new Status();
    }