import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import CreateUSer from "./components/CreateUSer";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/create" Component={CreateUSer}/>
          <Route path="/edit/:id" Component={EditUser}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
