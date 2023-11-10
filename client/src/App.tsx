import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { useCheckToken } from "./customHooks/useCheckToken";
import Spinner from "./components/Spinner";
import Invoices from "./pages/Invoices";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  const [checkingToken, setCheckingToken] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);

  // Custom hook to check if token is valid
  useCheckToken(setCheckingToken);

  return (
    <BrowserRouter>
      <Routes>
        {checkingToken ? (
          <Route path="/" element={<Spinner />} />
        ) : (
          <>
            <Route path="/" element={ <ProtectedRoute checkingToken={checkingToken}><></></ProtectedRoute> } />
            <Route path="/invoices" element={<ProtectedRoute checkingToken={checkingToken}><Invoices/></ProtectedRoute>} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
