import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SingleproductsPage from "./components/SingleProduct";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<SingleproductsPage />} />
    </Routes>
  </Router>
);

export default App;
