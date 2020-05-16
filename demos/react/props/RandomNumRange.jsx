const RandomNumRange = ({min=1, max=10}) => {
    const rand = Math.floor(Math.random() * (max - min)) + min;
    return <h1>Rand is: {rand}</h1>;
// NON JSX SYNTAX ALSO WORKS
// return React.createElement("h1", null, "Rand is: " + rand);
};
