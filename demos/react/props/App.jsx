const App = () => (
  <div>
    <Alert>
      <h2>Hello!</h2>
      <RandomChoice choices={["red", "green", "yellow"]} />
      <RandomNumRange min={20} max={30} />
      <RandomNumRange />
    </Alert>
    <Animal name="Stevie Chicks" species="Silkie Chicken" emoji="🐔" isCute />
    <Animal name="Foxxie Brown" species="Red Fox" emoji="🦊" />
    <Animal emoji="😎" />
    <Bouncer age={19} />
    <Bouncer age={17} />
    <Bouncer age={23} />
    <TodoList todos={["walk chickens", "feed chickens", "eat chickens"]} />
  </div>
);

ReactDOM.render(<App />, document.querySelector("#root"));
