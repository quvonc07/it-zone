import NotFoundApp from "../pages/privite/NotFound"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Courses from "../pages/privite/Courses"
import Group from "../pages/privite/Group"
import Home from "../pages/privite/Home"
import News from "../pages/privite/News"
import Reception from "../pages/privite/Reception"
import Teachers from "../pages/privite/Teachers"
import InfoApp from "../pages/privite/Info"
export const authRoutes = [
  {
    key:1,
    path:"/login",
    element:<Login/>
  },
  {
    key:2,
    path:"/register",
    element:<Register/>
  }
]

export const priviteRoutes = [
    {
      key:1,
      roles:["admin","user"],
      path:"/",
      element:<Home/>,
      icon:<i className="bi bi-house-door-fill"></i>,
    },
    {
        key:1,
        roles:["admin","user"],
        path:"/home",
        element:<Home/>,
        icon:<i className="bi bi-house-door-fill"></i>,
        name:"Home"
      },
    {
        key:2,
        roles:["admin","user"],
        path:"/reception",
        element:<Reception/>,
        icon:<i className="bi bi-info-circle-fill"></i>,
        name:"Reception"
      },
      {
        key:3,
        roles:["admin","user"],
        path:"/course",
        element:<Courses/>,
        icon:<i className="bi bi-layers-half"></i>,
        name:"Course"
        
      },
      {
        key:4,
        roles:["admin","user"],
        path:"/group",
        element:<Group/>,
        icon:<i className="bi bi-collection-fill"></i>,
        name:"Group"
      },
      {
        key:5,
        roles:["admin","user"],
        path:"/teacher",
        element:<Teachers/>,
        icon:<i className="bi bi-mortarboard-fill"></i>,
        name:"Teacher"
      },
      {
        key:6,
        roles:["admin","user"],
        path:"/news",
        element:<News/>,
        icon:<i className="bi bi-volume-up-fill"></i>,
        name:"News"
      },
      {
        key:7,
        roles:["admin", "user"],
        path:"/notfound",
        element:<NotFoundApp/>,
      },
      {
        key: 8,
        roles: ["admin", "user"],
        path: "/info",
        element:<InfoApp/>
      }
  ]