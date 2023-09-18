import Home from "./pages/public/Home";
import LoginPage from "./pages/public/LoginPage";
import Register from "./pages/public/Register";
import DashBoard from "./pages/private/Dash/DashBoards";
import Wallet from "./pages/private/Dash/Wallet/Wallet";
import NewDash from "./pages/private/Dash/NewDash/NewDash";

const routes = [
    {path: "/", title: "Home", element: <Home/>, isPrivate: true},
    {path: "/login", title: "LoginPage", element: <LoginPage/>},
    {path: "/register", title: "Cadastro", element: <Register/>},
    {path: "/dash", title: "Dash", element: <DashBoard/>},
    {path: "/new_dash", title: "New Dash", element: <NewDash/>},
    {path: "/dash/wallet", title: "wallet", element: <Wallet/>}, // Venues
];

export default routes;
