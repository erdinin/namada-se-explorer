import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserSwitchOutlined,
  BlockOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import  xyzLogo  from "../assets/images/xyzLogo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  let path = window.location.pathname;

  useEffect(() => {}, []);

  const selectedKey = () => {
    if (path === "/dashboard") {
      return "1";
    } else if (path === "/validators") {
      return "2";
    } else if (path === "/blocks") {
      return "3";
    } else if (path === "/proposals") {
      return "4";
    } else {
      return "1";
    }
  };
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center py-4 bg-[#EBEBEB]">
        <Link to="/">
          <img src={xyzLogo} alt="logo" className="w-16" />
        </Link>
       
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[selectedKey()]}
        className="text-base font-normal text-black bg-[#EBEBEB]"
        items={[
          {
            key: "1",
            icon: <AppstoreOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
          },
          {
            key: "2",
            icon: <UserSwitchOutlined />,
            label: <Link to="/validators">Validators</Link>,
          },
          {
            key: "3",
            icon: <BlockOutlined />,
            label: <Link to="/blocks">Blocks</Link>,
          },
          {
            key: "4",
            icon: <ReconciliationOutlined />,
            label: <Link to="/proposals">Proposals</Link>,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
