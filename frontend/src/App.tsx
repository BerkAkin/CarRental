import MainContainer from "./Components/MainContainer/MainContainer";

function App() {
  const signatureOfDev = document.createComment("𓃦")
  document.body.appendChild(signatureOfDev);
  return (
    <div className="App">
      <MainContainer />

    </div>
  );
}

export default App;
