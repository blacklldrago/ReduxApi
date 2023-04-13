
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { destroyToken } from "../utils/axiosRequest";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Button } from "@mui/material";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div className="container">
          <div className="start flex justify-evenly bg-[#4F3CE1] h-[60px] pt-[20px] pb-[50px] ">
            <ul className="flex gap-[20px]">
              <Link to={"/users"}>
                <li className="text-[white] font-[600] text-[20px]"><GroupIcon sx={{position:"relative", bottom:"2px"}}/> Users</li>
              </Link>
              <Link to={"/todo"}>
                <li className="text-[white] font-[600] text-[20px]"><FormatListBulletedIcon sx={{position:"relative", bottom:"2px"}}/> Todo</li>
              </Link>
              <Link to={"/album"}>
                <li className="text-[white] font-[600] text-[20px]"><CollectionsIcon sx={{position:"relative", bottom:"2px"}}/> Album</li>
              </Link>
            </ul>
            <div>
              <Button variant="contained" color="success" className="bg-[#00e1ff] font-[600] text-[white]" onClick={()=>{destroyToken("")
              navigate("/");
              }}>Log out</Button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
