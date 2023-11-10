import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckToken } from "../types/interfaces";
import { setToken } from "../app/reducers/userReducer";
import { API } from "../app/api";
import { AxiosResponse } from "axios";

export function useCheckToken(setCheckingToken: (value: boolean) => void) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenHandler = async () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        setCheckingToken(true);
  
        try {
          const result: AxiosResponse<CheckToken> = await API.auth.check(token);
          const response: CheckToken = result.data;
  
          if (response.validToken) {
            dispatch(setToken(token));
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } finally {
          setCheckingToken(false);
        }
      }
    };
  
    checkTokenHandler();
  }, [dispatch]);
}
