import MainRoutingComponent from "./Components/MainRoutingComponent/MainRoutingComponent";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { SliderDataProvider } from "./Contexts/SliderContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { ToastManagerContextProvider } from "./Contexts/ToastManagerContext";
import ConfirmationPopup from "./Components/ConfirmationPopup/ConfirmationPopup";
import { ConfirmContextProvider } from "./Contexts/ConfirmationContext";
library.add(faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles)

function App() {
  const signatureOfDev = document.createComment("𓃦")
  document.body.appendChild(signatureOfDev);
  return (
    <div className="App">
      <ConfirmContextProvider>
        <ToastManagerContextProvider>
          <AuthContextProvider>
            <SliderDataProvider>
              <MainRoutingComponent />
            </SliderDataProvider>
          </AuthContextProvider>
        </ToastManagerContextProvider>
      </ConfirmContextProvider>

    </div>
  );
}

export default App;
