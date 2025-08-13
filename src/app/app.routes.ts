import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreateUser } from './pages/admin/create-user/create-user';
import { UpdateUser } from './pages/admin/update-user/update-user';
import { ShowUsers } from './pages/admin/show-users/show-users';
import { Orders } from './pages/admin/orders/orders';
import { LayoutUser } from './pages/layout-user/layout-user';
import { PersonalInfo } from './pages/personal-info/personal-info';
import { MyOrders } from './pages/User/my-orders/my-orders';
import { CreateOrder } from './pages/User/create-order/create-order';
import { authGuard } from './guards/auth-guard';
import { UpdateOrder } from './pages/User/update-order/update-order';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        component:Layout,
        children:[
            {
                path:'create-user',
                component:CreateUser,
                canActivate:[authGuard]
            },
            {
                path:'update-user',
                component:UpdateUser,
                canActivate:[authGuard]
            },
            {
                path:'users',
                component:ShowUsers,
                canActivate:[authGuard]
            },
            {
                path:'orders',
                component:Orders,
                canActivate:[authGuard]
            },
            {
                path:'personal-Info',
                component:PersonalInfo,
                canActivate:[authGuard]
            }
            
        ]
    },
    {
        path:'user',
        component:LayoutUser,
        children:[
            {
                path:'create-order',
                component:CreateOrder,
                canActivate:[authGuard]
            },
            {
                path:'update-order',
                component:UpdateOrder,
                canActivate:[authGuard]
            },
            {
                path:'my-orders',
                component:MyOrders,
                canActivate:[authGuard]
            },
            {
                path:'personal-Info',
                component:PersonalInfo,
                canActivate:[authGuard]
            }

            
        ]
    }

];
