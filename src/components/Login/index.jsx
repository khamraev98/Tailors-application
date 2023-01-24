import React, { useState } from "react";
import { Wrapper } from "./style";
import logo from "../../assets/images/icon.jpg";
import ShapeSvg from "../Generic/ShapeSVG";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ fullName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [playWarningAnimation, setPlayWarningAnimation] = useState(false);

  const UseNotification = ({ type, message, description, placement }) => {
    notification[type]({
      message,
      description,
      placement,
    });
  };
  const handleWarningAnimation = () => {
    setPlayWarningAnimation(true);
    setTimeout(() => {
      setPlayWarningAnimation(false);
    }, 1000);
  };

  const handleChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.type === "click") onAuth();
  };

  const onAuth = () => {
    if (!userInfo.fullName || !userInfo.password) {
      handleWarningAnimation();
      UseNotification({
        type: "error",
        message: " please fill all fields",
        placemenmt: "topRight",
      });
      return;
    }

    setLoading(true);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/user/login`,
      data: userInfo,
    })
      .then((res) => {
        const { token, user } = res.data.data;

        /* localStorage.setItem("token", token);

        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("isAuthed", true); */
        signIn({
          token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { fullname: user.fullName },
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        handleWarningAnimation();
        setLoading(false);
        if (error.request.status >= 500)
          UseNotification({
            type: "error",
            message: "ERROR",
            description: " server is not working",
            placement: "topRight",
          });

        UseNotification({
          type: "error",
          message: "ERROR",
          description: error.response.data.extraMessage,
          placement: "topRight",
        });
      });
  };
  return (
    <Wrapper>
      <Wrapper.Container>
        <Wrapper.Left>
          <ShapeSvg
            firstColor={"#376dd2"}
            secondColor={"#39acea"}
            top="0"
            right={"0"}
          />
          <Wrapper.LoginGIF />
          <ShapeSvg
            firstColor={"#376dd2"}
            secondColor={"#39acea"}
            bottom="0"
            left={"0"}
          />
        </Wrapper.Left>
        <Wrapper.Right>
          <Wrapper.RightContainer>
            <Wrapper.Icon src={logo} />
            <Wrapper.Title>Hello Again</Wrapper.Title>
            <Wrapper.Desc>Allways be in good progress with us!</Wrapper.Desc>
            <Wrapper.Input
              onChange={handleChange}
              name="fullName"
              placeholder="Name"
            />
            <Wrapper.PasswordInput
              onChange={handleChange}
              name="password"
              placeholder="password"
              onKeyDown={handleKeyDown}
            />
            <Wrapper.Button
              warningAnimation={playWarningAnimation}
              onClick={handleKeyDown}
            >
              {loading ? <LoadingOutlined /> : "Login"}
            </Wrapper.Button>
          </Wrapper.RightContainer>
        </Wrapper.Right>
      </Wrapper.Container>
    </Wrapper>
  );
};

export default Login;
