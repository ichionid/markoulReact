import React, {useEffect, useState} from 'react';
import {
  Link
} from "react-router-dom";
function TodoList(props) {
    const { USER, PASS } = process.env;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItems, setTodoItems] = useState({});

    useEffect(() => {
        const apiUrl = 'https://dev-markoul.pantheonsite.io/json/content/basic?_format=hal_json';
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(USER+":"+PASS).toString('base64'),
                'Content-Type': 'application/json'
        }})
          .then(response => response.json())
          .then(
            (data) => {
                setTodoItems(data);
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
      } else if(isLoaded && todoItems) {
      return <div>
            <ul>
              {todoItems.map((value, index) => {
                return <li key={index}><Link to={'/item/'+value.nid}>{value.title}</Link></li>
              })}
            </ul>
        </div>;
      } else {
        return <div>Loading...</div>;
      }
}

export default TodoList;
