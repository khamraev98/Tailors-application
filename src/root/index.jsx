import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import { redirectPath } from "../utils/redirectPaths";
import { RequireAuth } from "react-auth-kit";
import Home from "../components/Home";

const Root = () => {
  /* const location = useLocation();
  const isAuthed = localStorage.getItem("isAuthed");
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]); */

  return (
    <Routes>
      {/* {!!isAuthed ? (
        <Route path="/" element={<Navbar />}></Route>
      ) : (
        <>
          {redirectPath.includes(currentPath) ? (
            <Route path={currentPath} element={<Navigate to={"/login"} />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </>
      )} */}
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <Navbar />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Root;
