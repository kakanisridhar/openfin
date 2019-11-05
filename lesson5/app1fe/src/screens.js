import SideNav from "./sidenav/SideNav";

const Screens = [
    {
        path: "/sidenav",
        name: "SideNav",
        component: SideNav,
        options: {
            width: 100,
            height: 500,
            left: 10,
            top: 150 
        }
    }
]

export default Screens;