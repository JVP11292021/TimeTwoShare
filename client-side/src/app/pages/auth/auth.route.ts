import { Route } from "@angular/router";
import { LoginPageComponent } from "../auth/components/login-page/login-page.component";
import { SingInPageComponent } from "../auth/components/sing-in-page/sing-in-page.component";

export const authRoutes: Route[] = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'sign-in',
        component: SingInPageComponent
    }
]