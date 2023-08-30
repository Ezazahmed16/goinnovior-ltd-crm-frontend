import { BiSolidDashboard, BiUserCircle } from "react-icons/bi";
import { SiGooglemarketingplatform } from "react-icons/si";
import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { BsKanban } from "react-icons/bs";

export const links = [
    // Dashboard 
    {
        title: 'Dashboard',
        links: [
            {
                name: 'dashboard',
                icon: <BiSolidDashboard />,
            },
        ],
    },
    // Apps 
    {
        title: 'Apps',
        links: [
            {
                name: 'calendar',
                icon: <AiOutlineCalendar />,
            },
            {
                name: 'kanban',
                icon: <BsKanban />,
            }
        ],
    },

    // Pages 
    {
        title: 'pages',
        links: [
            {
                name: 'clients',
                icon: <BiUserCircle />,
            },
            {
                name: 'marketing',
                icon: <SiGooglemarketingplatform />,
            },
            {
                name: 'human resource ',
                icon: <AiOutlineUser />,
            },
            {
                name: 'accounts',
                icon: <MdManageAccounts />,
            },
        ],
    },
    // Settings 
    {
        title: 'settings',
        links: [
            {
                name: 'clients',
                icon: <BiUserCircle />,
            },
            {
                name: 'marketing',
                icon: <SiGooglemarketingplatform />,
            },
            {
                name: 'human resource ',
                icon: <AiOutlineUser />,
            },
            {
                name: 'accounts',
                icon: <MdManageAccounts />,
            },
        ],
    }

];