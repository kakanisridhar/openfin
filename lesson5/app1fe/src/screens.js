import SideNav from "./sidenav/SideNav";

const Screens = [
    {
        path: "/sidenav",
        name: "SideNav",
        options: {
            defaultWidth: 200,
            defaultHeight: 700,
        },
        displayInSideNav: false
    },
    {
        path: "/sla",
        name: "SLA Monitoring",
        options: {
            defaultWidth: 500,
            defaultHeight: 500,
        },
        displayInSideNav: true
    },
    {
        path: "/members",
        name: "Member Locator",
        options: {
            defaultWidth: 500,
            defaultHeight: 500,
        },
        displayInSideNav: true
    }
]

export default Screens;