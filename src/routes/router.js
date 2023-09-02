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
import Singin from '../shared/Singin/Singin'
import Singup from '../shared/Singup/Singup'
import ClientsInfo from "../pages/Clients/ClientsInfo/ClientsInfo";
import Invoices from "../pages/Accounts/Invoices/Invoices";

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
                path: '/clients-clientsInfo',
                element: <ClientsInfo />
            },
            {
                path: '/marketing-leads',
                element: <Leads />
            },
            {
                path: '/human-resource',
                element: <HumanResource />
            },
            {
                path: '/accounts-invoice',
                element: <Invoices></Invoices>
            },
            {
                path: '/marketing/leads',
                element: <Leads></Leads>
            },
            {
                path: '/admin/genarel-settings',
                element: <GenarelSettings />
            },
        ]
    },
    {
        path: '/singin',
        element: <Singin />
    },
    {
        path: '/singup',
        element: <Singup></Singup>
    },
]);

export default router