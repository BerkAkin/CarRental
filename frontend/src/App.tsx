import MainContainer from "./Components/MainContainer/MainContainer";
import { SliderDataProvider } from "./Contexts/SliderContext";

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
