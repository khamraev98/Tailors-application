import React, { useState } from "react";
import { Wrapper } from "./style";
import logo from "../../assets/icons/navbarLogo.png";
import { Dropdown } from "antd";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "react-auth-kit";
import { warning } from "../Generic/Notification/ByModal";
import ProfileModal from "../Login/ProfileModal";
import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const items = [
    {
      label: (
        <div>
          <Wrapper.MenuItem onClick={() => setShowProfileModal(true)}>
            <IoMdSettings />
            <Wrapper.MenuItemText>Settings</Wrapper.MenuItemText>
          </Wrapper.MenuItem>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div>
          <Wrapper.MenuItem
            onClick={() => {
              setShowConfirm(true);
              warning({
                title: "Are you sure you want to log out?",
                content: "It is possible to ignore this by the confirmation!",
                onOk: () => {
                  signOut();
                  setShowConfirm(false);
                },
                okButtonProps: { danger: true },
                okText: "log out",
                open: showConfirm,
              });
            }}
          >
            <BiLogOut style={{ color: "red" }} />
            <Wrapper.MenuItemText danger>Logout</Wrapper.MenuItemText>
          </Wrapper.MenuItem>
        </div>
      ),
      key: "1",
    },
  ];
  return (
    <Wrapper>
      <Wrapper.NavbarWrapper>
        <ProfileModal
          open={showProfileModal}
          onCancel={() => setShowProfileModal(false)}
        />
        <Wrapper.Container>
          <Wrapper.Logo loading="lazy" src={logo} />
          <Dropdown
            menu={{
              items,
            }}
            trigger={["hover"]}
          >
            <Wrapper.Avatar>A</Wrapper.Avatar>
          </Dropdown>
        </Wrapper.Container>
      </Wrapper.NavbarWrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Navbar;
