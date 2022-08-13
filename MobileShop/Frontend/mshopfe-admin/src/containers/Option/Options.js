import { useParams, useLocation } from "react-router-dom";
export default function Products() {
  let location = useLocation();
  console.log(location.pathname.split("/")[3]);
  return <div>Option {location.pathname.split("/")[3]}</div>;
}
