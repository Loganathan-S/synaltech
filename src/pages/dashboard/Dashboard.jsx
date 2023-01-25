import { Outlet, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import {
  DatabaseOutlined,
  DeploymentUnitOutlined,
  FundOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { routeNames } from "../../routes/routeNames";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${routeNames.dashboard}${routeNames.synaltech}`);
  }, []);

  return (
    <Layout className="min-vh-100">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          style={{ fontSize: "16px" }}
          onClick={({ key }) => {
            if (key === "logout") {
              navigate(routeNames.auth.login);
            } else {
              navigate(key);
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            `${routeNames.dashboard}${routeNames.synaltech}`,
          ]}
          items={[
            {
              key: `${routeNames.dashboard}${routeNames.synaltech}`,
              icon: <DeploymentUnitOutlined />,
              label: "Synal Tech",
            },
            {
              key: `${routeNames.dashboard}${routeNames.device}`,
              icon: <DatabaseOutlined />,
              label: "Device",
            },
            // {
            //   key: `${routeNames.dashboard}${routeNames.switchbox}`,
            //   icon: <PieChartOutlined />,
            //   label: "SwitchBox",
            // },
            {
              key: `${routeNames.dashboard}${routeNames.mapping}`,
              icon: <FundOutlined />,
              label: "Configure",
            },
            // {
            //   icon: <SettingOutlined />,
            //   label: "Settings",
            //   children: [
            //     {
            //       key: `${routeNames.dashboard}${routeNames.zone}`,
            //       label: "Zone",
            //     },
            //     {
            //       key: `${routeNames.dashboard}${routeNames.section}`,
            //       label: "Section",
            //     },
            //     {
            //       key: `${routeNames.dashboard}${routeNames.location}`,
            //       label: "Location",
            //     },
            //   ],
            // },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            margin: 0,
            paddingLeft: 3,
            fontSize: 25,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 385,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
