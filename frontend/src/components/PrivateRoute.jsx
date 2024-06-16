import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/Home"; // Assuming Home is the component to render

const PrivateRoute = () => {
  // No need for element prop here
  // Destructure context
  const { user, firstName, lastName } = useContext(AuthProvider);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <Home firstName={firstName} lastName={lastName} />; // Pass any remaining props to Home
};

export default PrivateRoute;
