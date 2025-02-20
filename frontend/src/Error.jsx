const Error = ({ error, setError }) => {
  return (
    <div className="container mt-3">
      <div className="notification is-danger">
        <button className="delete" onClick={() => setError("")}></button>
        {error}
      </div>
    </div>
  )
}

export default Error;
