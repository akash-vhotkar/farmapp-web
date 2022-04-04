import { Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../view/Login';
const PrivateRoute  = (props)=>{
    const token  = "user token";

    return  token ? <Outlet/>: (
        <Navigate to={'/signin'}/>
    )
}

export default PrivateRoute;
