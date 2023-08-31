import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import Leads from "../pages/Marketing/Leads/Leads";
import Error from "../shared/Error/Error";
import Calendar from "../pages/Calendar/Calendar";
import Kanban from "../pages/Kanban/Kanban";
import GenarelSettings from "../pages/Dashboard/GenarelSettings/GenarelSettings";
import Clients from "../pages/Clients/Clients";
import HumanResource from "../pages/HumanResource/HumanResource";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },

            {
                path: '/calendar',
                element: <Calendar />
            },
            {
                path: '/kanban',
                element: <Kanban />
            },

            {
                path: '/clients',
                element: <Clients />
            },
            {
                path: '/marketing',
                element: <Leads />
            },
            {
                path: '/human resource',
                element: <HumanResource />
            },
            {
                path: '/accounts',
                element: <Leads></Leads>
            },
            {
                path: '/marketing/leads',
                element: <Leads></Leads>
            },
            {
                path: 'genarel settings',
                element: <GenarelSettings />
            },
        ]
    },
]);

export default router