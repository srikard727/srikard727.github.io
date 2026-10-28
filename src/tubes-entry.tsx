import { createRoot } from "react-dom/client";
import TubesCursor from "./tubes-cursor";

const container = document.getElementById("tubes-cursor-react");
if (container) {
  createRoot(container).render(<TubesCursor />);
}
