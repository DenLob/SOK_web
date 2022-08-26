import Cabinet from "./pages/Cabinet";
import Auth from "./pages/Auth";
import PhotoPage from "./pages/PhotoPage";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "./utils/consts";


export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: Cabinet
    },
    {
        path: USER_ROUTE + '/:id',
        Component: PhotoPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]