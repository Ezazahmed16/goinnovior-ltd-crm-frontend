import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import Leads from "../pages/Marketing/Leads/Leads";
import Error from "../shared/Error/Error";
import Calendar from "../pages/Calendar/Calendar";
import Kanban from "../pages/Kanban/Kanban";
import HumanResource from "../pages/HumanResource/HumanResource";
import Singin from '../shared/Singin/Singin'
import ClientsInfo from "../pages/Clients/ClientsInfo/ClientsInfo";
import Invoices from "../pages/Invoices/Invoices";
import AddNewLead from "../pages/Marketing/Leads/AddNewLead";
import AddCompany from "../pages/Dashboard/Marketing/AddCompany/AddCompany";
import AddPosition from "../pages/Dashboard/Marketing/AddPosition/AddPosition";
import AddDepartment from "../pages/Dashboard/Marketing/AddDepartment/AddDepartment";
import AddCompanyType from "../pages/Dashboard/Marketing/AddCompanyType/AddCompanyType";
import CreateUser from "../pages/Dashboard/GenarelSettings/CreateUser/CreateUser";
import AllUser from "../pages/Dashboard/GenarelSettings/AllUser/AllUser";
import { RequireAuth } from "react-auth-kit";
import RoleBasedRoute from "./RoleBasedRoute";
import Unauthorized from "../shared/Unauthorized/Unauthorized";
import ResumeAdd from "../pages/HumanResource/RecruitmentManegment/ResumeAdd/Resume";
import InterviewEvaluation from "../pages/HumanResource/RecruitmentManegment/InterviewEvaluation/InterviewEvaluation";
import EmployConfirmation from "../pages/HumanResource/RecruitmentManegment/EmployConfirmation/EmployConfirmation";
import LeadDetails from "../pages/Marketing/Leads/LeadDetails";
import DetailsInvoice from "../pages/Invoices/DetailsInvoice";
import Contact from "../pages/Marketing/Contact/Contact";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth loginPath={'/singin'}>
            <Main></Main>
        </RequireAuth>,
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
                path: '/unauthorized',
                element: <Unauthorized></Unauthorized>
            },

            {
                path: '/calendar',
                element:
                    <Calendar />
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
                path: '/human-resource',
                element: (
                    <RoleBasedRoute
                        path="/human-resource"
                        element={<HumanResource />}
                        requiredRoles={['hr', 'admin']}
                    />
                ),
            },
            {
                path: '/human-resource/recruitment/add-resume',
                element: (
                    <RoleBasedRoute
                        path="/human-resource/recruitment/add-resume"
                        element={<ResumeAdd />}
                        requiredRoles={['hr', 'admin']}
                    />
                ),
            },
            {
                path: '/human-resource/recruitment/interview-evaluation',
                element: (
                    <RoleBasedRoute
                        path="/human-resource/recruitment/interview-evaluation"
                        element={<InterviewEvaluation />}
                        requiredRoles={['hr', 'admin']}
                    />
                ),
            },
            {
                path: '/human-resource/recruitment/employ-confirmation',
                element: (
                    <RoleBasedRoute
                        path="/human-resource/recruitment/employ-confirmation"
                        element={<EmployConfirmation />}
                        requiredRoles={['hr', 'admin']}
                    />
                ),
            },

            {
                path: '/invoice',
                element: (
                    <RoleBasedRoute
                        path="/invoice"
                        element={<Invoices />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/invoice-details/:id',
                element: (
                    <RoleBasedRoute
                        path="/invoice-details/:id"
                        element={<DetailsInvoice />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            // ======= Marketing =======
            // ======= Marketing - Leads =======
            {
                path: '/marketing-leads',
                element: (
                    <RoleBasedRoute
                        path="/marketing-leads"
                        element={<Leads />}
                        requiredRoles={['admin', 'marketing']}
                    />
                ),
            },
            {
                path: '/marketing-leads/:id',
                element: (
                    <RoleBasedRoute
                        path="/marketing-leads/:id"
                        element={<LeadDetails />}
                        requiredRoles={['admin', 'marketing']}
                    />
                ),
            },

            {
                path: '/marketing/leads/add',
                element: <AddNewLead></AddNewLead>
            },

            // ======= Marketing - Contact =======
            {
                path: '/marketing-contact',
                element: (
                    <RoleBasedRoute
                        path="/marketing-contact"
                        element={<Contact />}
                        requiredRoles={['admin', 'marketing']}
                    />
                ),
            },

            // ==== Admin ==== 

            {
                path: '/admin/genarel-settings/createUser',
                element: (
                    <RoleBasedRoute
                        path="/admin/genarel-settings/createUser"
                        element={<CreateUser />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/admin/genarel-settings/allUsers',
                element: (
                    <RoleBasedRoute
                        path="/admin/genarel-settings/allUsers"
                        element={<AllUser />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/admin/marketing-addCompany',
                element: (
                    <RoleBasedRoute
                        path="/admin/marketing-addCompany"
                        element={<AddCompany />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/admin/marketing-addPosition',
                element: (
                    <RoleBasedRoute
                        path="/admin/marketing-addPosition"
                        element={<AddPosition />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/admin/marketing-companyType',
                element: (
                    <RoleBasedRoute
                        path="/admin/marketing-companyType"
                        element={<AddCompanyType />}
                        requiredRoles={['admin']}
                    />
                ),
            },
            {
                path: '/admin/marketing-addDepartment',
                element: (
                    <RoleBasedRoute
                        path="/admin/marketing-addDepartment"
                        element={<AddDepartment />}
                        requiredRoles={['admin']}
                    />
                ),
            },
        ]
    },
    {
        path: "/singin",
        element: <Singin></Singin>,
        errorElement: <Error />,
    }
]);

export default router