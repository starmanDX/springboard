const Animal = (props) => (
    <div>
      <h1>{props.emoji}</h1>
      <ul>
        <li>Name: {props.name}</li>
        <li>Species: {props.species}</li>
            <li>IsCute: {props.isCute ? "✅" : "❌"}</li>
      </ul>
    </div>
  );
