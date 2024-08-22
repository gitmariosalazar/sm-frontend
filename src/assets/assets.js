import menubar from "./menubar/menubar.png";
import home from "./menubar/home.png";
import close from "./menubar/close.png";
import graphqllogo from "./menubar/graphqllogo.png";
import githubtoken from "./menubar/githubtoken.png";
import logo from "./menubar/logo.png";
import star from "./menubar/star.png";
import eye from "./menubar/eye.png";
import codefork from "./menubar/codefork.png";
import key from "./menubar/key.png";
import padlock from "./menubar/padlock.png";
import calendar from "./menubar/calendar.png";
import bargraph from "./menubar/bargraph.png";
import graphql from "./menubar/graphql.png";
import analytics from "./menubar/analytics.png"
import code from "./menubar/code.png"
import branch from "./menubar/branch.png"

export const list_menu = [
    {
        id: 1,
        title: "Home",
        menu: "home",
        to: "/",
        icon: home,
        state: "public",
        submenu: [],
    },
    {
        id: 2,
        title: "GitHub Token Management",
        menu: "githubtoken",
        to: "/githubtoken",
        icon: githubtoken,
        state: "public",
        submenu: [],
    },
    {
        id: 3,
        title: "GraphQL Explorer",
        menu: "graphqlexplorer",
        to: "/graphqlexplorer",
        icon: graphqllogo,
        state: "public",
        submenu: [],
    },
    {
        id: 4,
        title: "Analytics",
        menu: "analytics",
        to: "/analytics",
        icon: analytics,
        state: "public",
        submenu: [],
    },
];

export const menuicons = {
    menubar,
    home,
    close,
    githubtoken,
    graphqllogo,
    logo,
    star,
    eye,
    codefork,
    key,
    padlock,
    calendar,
    bargraph,
    graphql,
    analytics,
    code,
    branch
};
