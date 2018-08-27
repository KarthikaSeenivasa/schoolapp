import Login from '../user/Login';
import Application from '../components/app/Application';
import Dashboard from '../components/app/Dashboard';


const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/app",
        component: Application,
        routes: [
            {
                path: "/app/dashoard",
                component: Dashboard
            }
        ]
    }
];

export default routes;