import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Home } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import GuestGuard from "./guards/guest-guard";
import Students from "./pages/dashboard/student/students";
import Administrators from "./pages/dashboard/administrator/administrators";
import RoleGuard from "./guards/role-guard";
import Messages from "./pages/dashboard/message/messages";
import Schedules from "./pages/dashboard/schedule/schedules";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "schedule",
        path: "/schedule",
        element: <Schedules />,
      },
      // {
      //   icon: <ChatBubbleLeftIcon {...icon} />,
      //   name: "messages",
      //   path: "/messages",
      //   element: <Messages />,
      //   guard: {
      //     Guard: RoleGuard,
      //     props: {
      //       redirect: false,
      //       role: ['student', 'administrator']
      //     },
      //   }
      // },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "students",
        path: "/students",
        element: <Students />,
        guard: {
          Guard: RoleGuard,
          props: {
            redirect: false,
            role: ['super', 'administrator']
          },
        }
      },
      {
        icon : <UserCircleIcon {...icon} />,
        name: "administrators",
        path: "/administrators",
        element: <Administrators />,
        guard: {
          Guard: RoleGuard,
          props: {
            redirect: false,
            role: 'super'
          },
        }
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        guard: {
          Guard: GuestGuard,
          props: {
            redirect: false,
          },
        }
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        guard: {
          Guard: GuestGuard,
          props: {
            redirect: false,
          },
        }
      },
    ],
  },
];

export default routes;
