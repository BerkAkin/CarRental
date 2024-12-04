import MainContainer from "./Components/MainContainer/MainContainer";
import { SliderDataProvider } from "./Contexts/SliderContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
library.add(faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles)

function App() {
  const signatureOfDev = document.createComment("𓃦")
  document.body.appendChild(signatureOfDev);
  return (
    <div className="App">
      <SliderDataProvider>
        <MainContainer />
      </SliderDataProvider>


    </div>
  );
}

export default App;
