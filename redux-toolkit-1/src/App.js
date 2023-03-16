import React, { Children, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { startApp } from "./features/auth/authSlice";
import AboutPage from "./routes/AboutPage";
import AuthRoute from "./routes/AuthRoute";
import ContactPage from "./routes/ContactPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
import ProfilePage from "./routes/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Root from "./routes/RootPage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "signin",
        element: <AuthRoute comp={<SignInPage />} />,
      },
      {
        path: "signup",
        element: <AuthRoute comp={<SignUpPage />} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute comp={<ProfilePage />} />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startApp());
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
