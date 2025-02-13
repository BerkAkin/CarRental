import MainRoutingComponent from "./Components/MainRoutingComponent/MainRoutingComponent";
import { AuthContextProvider } from "./Contexts/AuthContext";
import { SliderDataProvider } from "./Contexts/SliderContext";
import { ToastManagerContextProvider } from "./Contexts/ToastManagerContext";
import { ConfirmContextProvider } from "./Contexts/ConfirmationContext";

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
