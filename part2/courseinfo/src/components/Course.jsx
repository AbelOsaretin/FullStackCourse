const Course = ({ course }) => {
  return <h1 key={course.id}>{course.name}</h1>;
};

export default Course;
