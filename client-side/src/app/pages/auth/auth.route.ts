import { Route } from "@angular/router";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import { RegisterPageComponent } from "./components/sign-in-page/register-page.component";

export const authRoutes: Route[] = [
    {
        path: '',
        component: AuthPageComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    }
]