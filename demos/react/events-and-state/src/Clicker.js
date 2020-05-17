import React from "react";
const Clicker = () => {
  const fireLasers = (e) => {
    console.log(e);
    console.log(e.nativeEvent);
    console.log("THE LASERS HAVE BEEN FIRED!");
    console.log("PEW PEW PEW!");
  };
  return (
    <>
      <button onClick={fireLasers}>CLICK ME!</button>;
      <textarea onScroll={fireLasers} name="" id="" cols="30" rows="10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
        expedita reiciendis, explicabo perspiciatis hic libero voluptate odit
        autem esse optio minima iure quam temporibus est ipsam excepturi aut
        sapiente, dignissimos necessitatibus culpa voluptas cupiditate ipsum.
        Nisi et adipisci exercitationem libero incidunt, sint, vel nihil
        cupiditate maxime dicta, dolore odio blanditiis?
      </textarea>
    </>
  );
};

export default Clicker;
