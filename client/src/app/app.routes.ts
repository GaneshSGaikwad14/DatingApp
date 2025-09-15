import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Messages } from '../features/messages/messages';
import { List } from '../features/list/list';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path:'',component:Home},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
             {path:'members',component:MemberList , canActivate:[authGuard]},
    {path:'members/:id',component:MemberDetailed},
    {path:'messages',component:Messages},
    {path:'lists',component:List},
        ]
    },
   { path:'**',component:Home},

];
