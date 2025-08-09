import { useEffect } from "react";
import {NavBar} from "./components/NavBar"
function App() {
  useEffect(() => {
    console.log("fetching")
    fetch("/api/discover")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return <>
    <NavBar />
    </>;
}

export default App;
