import Dashboard from "./containers/Dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./containers/Home/Home";
import Landing from "./containers/Landing/Landing";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Landing />} />
        <Route path="search" element={<Home />} />
      </Route>

      {/* <Route path="*" element={<Page404 />}></Route> */}
    </Routes>
  );
}

export default App;
