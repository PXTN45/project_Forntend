import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Restaurant from "./pages/Restaurant";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Sign_in from "./pages/Sign_in";
import Sign_up from "./pages/Sign_up";
import { Logout } from "./pages/Logout";
import Profile from "./pages/Profile";
import Notallow from "./pages/Notallow";
import Layout from "./components/layout";
import AdminRoute from "./pages/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Restaurant />} />
          <Route
            path="/add"
            element={
              <AdminRoute>
                <Add />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:restaurantId"
            element={
              <AdminRoute>
                <Edit />
              </AdminRoute>
            }
          />
          <Route path="/sign_in" element={<Sign_in />} />
          <Route path="/sign_up" element={<Sign_up />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/notallow" element={<Notallow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
