import React from "react";

let Course = ({ coures }) => {
  return (
    <div>
      {courses.map((course) => {
        let { name, id, parts } = course;
        let total = 0;
        return (
          <div>
            <h1>{name}</h1>
            <ul key={id}>
              {parts.map(({ name, exercises, id }) => {
                total += exercises;
                return (
                  <li key={id}>
                    {name} {exercises}
                  </li>
                );
              })}
              <li>Total of {total} exercises</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
const courses = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 1,
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 2,
      },
    ],
  },
];

function App() {
  return (
    <div>
      <Course coures={courses} />
    </div>
  );
}

export default App;
