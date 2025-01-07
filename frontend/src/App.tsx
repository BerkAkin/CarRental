import MainRoutingComponent from "./Components/MainRoutingComponent/MainRoutingComponent";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { SliderDataProvider } from "./Contexts/SliderContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { ToastManagerContextProvider } from "./Contexts/ToastManagerContext";
library.add(faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles)

function App() {
  const signatureOfDev = document.createComment("𓃦")
  document.body.appendChild(signatureOfDev);
  return (
    <div className="App">
      <ToastManagerContextProvider>
        <AuthContextProvider>
          <SliderDataProvider>
            <MainRoutingComponent />
          </SliderDataProvider>
        </AuthContextProvider>
      </ToastManagerContextProvider>
    </div>
  );
}

export default App;
