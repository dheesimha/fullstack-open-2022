const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = () => {
  return (
    <div>
      <Part part="Fundamentals of React" exercises={10} />
      <Part part="Using props to pass data" exercises={7} />
      <Part part="State of a component" exercises={14} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const App = () => {
  return (
    <div>
      <Header course="Half Stack application development" />
      <Content />
      <Total e1={10} e2={7} e3={14} />
    </div>
  );
};

export default App;
