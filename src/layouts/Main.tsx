import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Button, Tag } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { Route, Routes } from "react-router-dom";
import { Blocks, Dashboard, Validators, Proposals } from "../pages";
import Sidebar from "./Sidebar";

const Main = () => {
  const [collapsed, setCollapsed] = useState(true)
  ;

  useEffect(() => {
    if (window.innerWidth < 426) {
      setCollapsed(true);
    }
  }, []);

  return (
    <Layout className="h-screen w-full flex flex-row">
      <Sider
        className={
          collapsed
            ? "max-md:hidden bg-[#EBEBEB]"
            : "visible sider bg-[#EBEBEB]"
        }
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#EBEBEB" }}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <div className="flex flex-row ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                zIndex: 999,
              }}
            />
            <div style={{display:"flex", width:"100%", paddingRight:"50px", justifyContent:"space-between"}}>
              <Tag className="flex justify-center m-4" style={{alignItems:"center"}} color="purple">xyznodes - Namada SE Explorer</Tag>
              
              
              <Tag className="flex justify-center m-4" style={{alignItems:"center", fontWeight:"bold"}} color="yellow">Chain ID - shielded-expedition.88f17d1d14</Tag>  
            </div>           
          </div>
        </Header>

        <Content className="m-[24px] p-[24px] bg-white rounded-md h-full overflow-scroll">
          <Routes>
            <Route path="/" element={<Dashboard  />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/validators" element={<Validators />} />
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/proposals" element={<Proposals />} />
          </Routes>
        </Content>
        <Footer className="text-center pt-0">
          Copyright 2024 © ALL RIGHTS RESERVED. Design by{" "}
          <a href="https://www.xyznodes.xyz" target="_blank" rel="noreferrer">
            xyznodes
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
