import Home from "./components/Home";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "anime world - find any anime here";
  }, []);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
