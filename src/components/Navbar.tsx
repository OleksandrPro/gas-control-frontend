import { Link } from 'react-router-dom';

const containerStyle = {
  display: "flex",
  gap: "20px",
  padding: "10px",
  borderBottom: "1px solid #ccc",
  alignItems: "center"
};

const navStyle = {
    display: "flex",
    gap: "10px"
};

export const Navbar = () => {
  return (
    <div style={containerStyle}>
      <div>
        <h1>GAMS</h1>
      </div>
     <nav style={navStyle}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/card-details">CardDetails</Link> |{" "}
        <Link to="/dictionaries">Dictionaries</Link>
      </nav>
    </div>
  )
}