const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>Total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => parts.map((part) => <Part part={part} />);

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  );
};

export default Course;
