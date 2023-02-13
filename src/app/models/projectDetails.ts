import { state } from "@angular/animations";
import { Maqawl } from "./maqawl";
import { ProjectCategory } from "./ProjectCategory";
import { Status } from "./status";
import { User } from "./user";

export class ProjectDetails
{
    ID:number=0;
    Project_Name:string='';
    Project_Location:string='';
    Project_ProjectPeriod:number=0;
    Project_ManPower:number=0;
    Project_EndDate?:Date=new Date();
    Project_User:User=new User();
    Project_Maqawl:Maqawl=new Maqawl();
    Project_Category:ProjectCategory=new ProjectCategory;
    Project_Status:Status=new Status();
    Project_User_Percentage:number=0;
    Project_Maqawl_Percentage:number=0;
}