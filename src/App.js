import "./App.css";
import { LeafletMap } from "./components/LeafletMap";
import { MapLibreComponent } from "./components/MapLibreComponent";

function App() {
  return (
    <div className="App">
      <div className="flex-container">
        <h1>React Leaflet</h1>
        <LeafletMap />
      </div>
      <div className="flex-container">
        <h1>React Map GL (MapLibre)</h1>
        <MapLibreComponent />
      </div>
    </div>
  );
}

export default App;
