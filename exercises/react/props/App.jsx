const App = () => (
  <div>
    <Tweet
      username="starmanDX"
      name="James"
      date="10/23/2019"
      message="It's my birthday!"
    />
    <Tweet
      username="friendOfStarman"
      name="Paul"
      date="10/23/2019"
      message="Happy birthday to starmanDX!"
    />
    <Tweet
      username="starmanDX"
      name="James"
      date="12/31/2019"
      message="Happy NYE!"
    />
  </div>
);

ReactDOM.render(<App />, document.querySelector("#root"));
