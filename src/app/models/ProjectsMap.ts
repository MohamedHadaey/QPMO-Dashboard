import { ProjectCategory } from "./ProjectCategory";
import { Status } from "./status";


export class ProjectsMap
    {
        ID:number=0;
        Project_Location:string='';
        Project_Name:string='';
        Project_ProjectPeriod:number=0;
        Project_ManPower:number=0;
        Project_EndDate?:Date=new Date();
        Project_User_Percentage:number=0;
        Project_Maqawl_Percentage:number=0;
        Status:Status=new Status();
        Category:ProjectCategory=new ProjectCategory();
    }