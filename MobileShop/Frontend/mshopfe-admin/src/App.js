import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Manufactures from "./containers/Manufactures/Manufactures";
import Products from "./containers/Products/Products";
import Series from "./containers/Series/Series";
import Users from "./containers/Users/Users";
import Options from "./containers/Option/Options";
import Page404 from "./containers/Pages/page404";
import Roles from "./containers/Role/Roles";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // const { idToken } = useSelector((state) => state.auth);

  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   if (idToken) {
  //     setIsLogin(true);
  //   }
  // }, [idToken]);

  let idToken = localStorage.getItem("jwt");

  return (
    <Routes>
      <Route
        path="/"
        element={idToken ? <Dashboard /> : <Navigate to="/login" />}
      >
        <Route index element={<Manufactures />} />
        <Route path="manufactures" element={<Manufactures />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="series" element={<Series />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<Options />} />
      </Route>
      <Route path="login" element={<Login />} />

      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
}

export default App;
