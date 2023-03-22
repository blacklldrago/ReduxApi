import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { destroyToken } from "../utils/axiosRequest";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <div className="start flex justify-evenly">
            <ul className="flex gap-[20px]">
              <Link to={"/users"}>
                <li>Users</li>
              </Link>
              <Link to={"/todo"}>
                <li>Todo</li>
              </Link>
              <Link to={"/album"}>
                <li>Album</li>
              </Link>
            </ul>
            <div>
              <button onClick={()=>{destroyToken("")
              navigate("/");
              }}>Log out</button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
