import { Maqawl } from "./maqawl";
import { Project } from "./project";
import { User } from "./user";

export class ProjectLog
    {
        ProjectLog_Id:number=0;
        ProjectLog_ProjectId:number=0;
        ProjectLog_UserId?:number=0;
        ProjectLog_MaqawlId?:number=0;
        ProjectLog_Date:Date=new Date();
        ProjectLog_DescAr:string='';
        ProjectLog_DescEn:string='';
        ProjectLog_Hidden:boolean=false;
        Maqawl:Maqawl=new Maqawl();
        Project:Project=new Project();
        User:User=new User();
    }