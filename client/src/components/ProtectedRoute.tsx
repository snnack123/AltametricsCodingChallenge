import { useSelector } from "react-redux";
import Homepage from "../pages/Homepage";
import Sidebar from "./Sidebar";
import { RootState } from "../app/store";

export default function ProtectedRoute(props: { readonly children: JSX.Element, readonly checkingToken: boolean }) {
  const token = useSelector((state: RootState) => state.user.token);
  const { children, checkingToken } = props;

  if (!token && !checkingToken) {
    return <Homepage />
  } else {
    return <Sidebar>{children}</Sidebar>
  }
};
