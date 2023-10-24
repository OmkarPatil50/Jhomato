import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { RestoDetails } from "./Pages/RestoDetails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resto/:restoID" element={<RestoDetails />} />
      </Routes>
    </div>
  );
}
