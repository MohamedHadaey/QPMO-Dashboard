import { ProjectCategory } from "./ProjectCategory";
import { Status } from "./status";

export class ProjectsCard
{
    Project_ID:number=0;
    Project_Name:string='';
    Project_MaqawlPercentage?:number=0;
    Project_UserPercentage?:number=0;
    Project_Status:Status=new Status();
    Project_Category:ProjectCategory=new ProjectCategory();
    Project_AddedDate?:Date=new Date();
    Project_RemainingDays?:number=0;
}