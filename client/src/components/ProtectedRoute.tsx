import { useSelector } from "react-redux";
import Homepage from "../pages/Homepage";
import { RootState } from "../app/store";
import AuthenticatedContent from "./AuthenticatedContent";
import Navbar from "./Menu/Navbar";

export default function ProtectedRoute(props: { readonly children: JSX.Element, readonly checkingToken: boolean }) {
  const token = useSelector((state: RootState) => state.user.token);
  const { children, checkingToken } = props;

  if (!token && !checkingToken) {
    return <Navbar><Homepage /></Navbar>
  } else {
    return <AuthenticatedContent>{children}</AuthenticatedContent>
  }

};
