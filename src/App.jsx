import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const Chat = lazy(() => import("./pages/Chat"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

let user = true; //TODO: Make it dynamic later

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
          {/* <Route element={<ProtectRoute user={!user} />}> */}
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Route>
          {/* <Route
            path="/login"
            element={
              <ProtectRoute user={!user}>
                <Login />
              </ProtectRoute>
            }
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
