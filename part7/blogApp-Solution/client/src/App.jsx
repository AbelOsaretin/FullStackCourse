import { useEffect } from "react";
import useNotificationStore from "./stores/notificationStore";
import { useBlogActions } from "./stores/blogStore";
import { useUser, useUserActions } from "./stores/userStore";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";

import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import Login from "./components/Login";
import loginService from "./services/login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

import Notification from "./components/Notification";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

const App = () => {
  const user = useUser();
  const { initializeUser, setUser, clearUser } = useUserActions();
  const notify = useNotificationStore((state) => state.notify);
  const { initializeBlogs } = useBlogActions();

  const navigation = useNavigate();

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const doLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      navigation("/");
    } catch {
      notify("wrong username or password", true);
    }
  };

  const handleLogout = async () => {
    clearUser();
    navigation("/");
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
          >
            blogs
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
          >
            users
          </Button>
          {!user ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
            >
              login
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
              >
                new blog
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
              >
                logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/login" element={<Login doLogin={doLogin} />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
