import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { GiCrossedSwords } from "react-icons/gi";

// export {
//     HomeOutlinedIcon,
//     ArrowForwardIosIcon,
//     ArrowBackIosIcon,
//     PeopleOutlinedIcon,
//     ReceiptOutlinedIcon,
//     BarChartOutlinedIcon,
//     MapOutlinedIcon,
//     GroupsIcon,
//     OndemandVideoIcon,
//     VideoCallIcon,
//     WebIcon,
//     QuizIcon,
//     WysiwygIcon,
//     ManageHistoryIcon,
//     SettingsIcon,
//     ExitToAppIcon,
//     GiCrossedSwords
// }
const MenuItems = [
    {
        subMenu: [
            {
                title: "Dashboard",
                Icon: HomeOutlinedIcon ,
                to: "/dashboard"
            }
        ]
    },
    {
        label: "Data",
        subMenu: [
            {
                title: "Users",
                Icon: GroupsIcon ,
                to: "/"
            },
            {
                title: "Invoices",
                Icon: ReceiptOutlinedIcon ,
                to: "/"
            },
        ]
    },
    {
        label: "Content",
        subMenu: [
            {
                title: "Create Course",
                Icon: VideoCallIcon ,
                to: "/dashboard/create-course"
            },
            {
                title: "Live Courses",
                Icon: OndemandVideoIcon ,
                to: "/"
            },
        ]
    },
    {
        label: "Customization",
        subMenu: [
            {
                title: "Hero",
                Icon: WebIcon ,
                to: "/"
            },
            {
                title: "FAQ",
                Icon: QuizIcon ,
                to: "/"
            },
            {
                title: "Categories",
                Icon: WysiwygIcon ,
                to: "/"
            },
        ]
    },
    {
        label: "Controllers",
        subMenu: [
            {
                title: "Manage Teams",
                Icon: PeopleOutlinedIcon ,
                to: "/"
            },
                    ]
    },
    {
        label: "Analytics",
        subMenu: [
            {
                title: "Course Analytics",
                Icon: BarChartOutlinedIcon ,
                to: "/"
            },
            {
                title: "Orders Analytics",
                Icon: MapOutlinedIcon ,
                to: "/"
            },
            {
                title: "Users Analytics",
                Icon: ManageHistoryIcon ,
                to: "/"
            },
                    ]
    },
    {
        label: "Extras",
        subMenu: [
            {
                title: "Settings",
                Icon: SettingsIcon ,
                to: "/"
            },
            {
                title: "Logout",
                Icon: ExitToAppIcon ,
                to: "/"
            },
                    ]
    },
]

export default MenuItems