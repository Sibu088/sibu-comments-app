import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/login");
  }, [navigate, setUser]);

  return null; // This route just performs the logout; no UI needed.
}
