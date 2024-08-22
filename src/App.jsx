import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import GitHub from "./pages/github/GitHub";
import Graphql from "./pages/graphql/Graphql";
import AddToken from "./pages/addtoken/AddToken";
import Analytics from "./pages/Analytics/Analytics";
import Details from "./pages/details/Details";
function App() {
  //https://1gt9jcx5-4000.use2.devtunnels.ms/profile

  return (
    <>
      <div className="header">
        <Navbar />
      </div>

      <div className="box-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/githubtoken" element={<GitHub />} />
          <Route path="/graphqlexplorer" element={<Graphql />} />
          <Route path="/addtoken" element={<AddToken />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
