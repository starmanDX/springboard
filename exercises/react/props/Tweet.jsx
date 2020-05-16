const Tweet = ({ username, name, date, message }) => {
  return (
    <div>
      <h4>{message}</h4>
      <ul>
        <li>
          Posted By: {username} ({name})
        </li>
        <li>Posted On: {date}</li>
      </ul>
    </div>
  );
};
