import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const myData = useSelector((state) => state.user);
  console.log(myData);
  return (
    <div>
      <h1>Home Page</h1>
      <hr />
      <p>
        HOME Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
        accusantium! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nisi, accusantium!Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nisi, accusantium! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nisi, accusantium!Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nisi, accusantium! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Nisi, accusantium!Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Nisi, accusantium! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Nisi, accusantium!Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Nisi, accusantium!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
        accusantium!
      </p>
    </div>
  );
};

export default Home;
