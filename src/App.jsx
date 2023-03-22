import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/loader/Loader";
import { Album, Layout, Login, Todo, Users } from "./routes/Routes";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      (pathname == "/users" || pathname == "/album" || pathname == "/todo") &&
      !sessionStorage.getItem("isLogged")
    ) {
      navigate("/");
    }
    if (pathname == "/" && sessionStorage.getItem("isLogged")) {
      navigate("/users");
    }
  }, [pathname]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path="users"
            element={
              <Suspense fallback={<Loader />}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="todo"
            element={
              <Suspense fallback={<Loader />}>
                <Todo />
              </Suspense>
            }
          />
          <Route
            path="album"
            element={
              <Suspense fallback={<Loader />}>
                <Album />
              </Suspense>
            }
          />
        </Route>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
