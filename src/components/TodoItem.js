import React, {useEffect, useState} from 'react';
import {
  useParams
} from "react-router-dom";

function TodoItem(props) {
    const { USER, PASS } = process.env;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItem, setTodoItem] = useState({});

    const { id } = useParams();
    useEffect(() => {
        const apiUrl = 'https://dev-markoul.pantheonsite.io/node/' + id + '?_format=hal_json';
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(USER+":"+PASS).toString('base64'),
                'Content-Type': 'application/json'
        }})
          .then(response => response.json())
          .then(
            (data) => {
                setTodoItem(data);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          );
      }, []);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if(isLoaded && todoItem) {
      return <div>
          <h2>
              {todoItem.title[0].value}
          </h2>
          <p>
            {todoItem.body[0].value}
          </p>
        </div>;
      } else {
        return <div>Loading...</div>;
      }
}

export default TodoItem;