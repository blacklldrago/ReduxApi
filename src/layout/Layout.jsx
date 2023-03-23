import { Button } from "antd";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { destroyToken } from "../utils/axiosRequest";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <div className="start flex justify-evenly bg-[#C50AB0] h-[60px] pt-[20px] pb-[50px]">
            <ul className="flex gap-[20px]">
              <Link to={"/users"}>
                <li className="text-[white] font-[600] text-[20px]">Users</li>
              </Link>
              <Link to={"/todo"}>
                <li className="text-[white] font-[600] text-[20px]">Todo</li>
              </Link>
              <Link to={"/album"}>
                <li className="text-[white] font-[600] text-[20px]">Album</li>
              </Link>
            </ul>
            <div>
              <Button className="bg-[#00e1ff] font-[600]" onClick={()=>{destroyToken("")
              navigate("/");
              }}>Log out &nbsp; <ExitToAppIcon/></Button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
