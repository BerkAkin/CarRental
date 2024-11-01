import Container from "./Components/Container/Container";

function App() {
  const signatureOfDev = document.createComment("𓃦")
  document.body.appendChild(signatureOfDev);
  return (
    <div className="App">
      <Container />

    </div>
  );
}

export default App;
