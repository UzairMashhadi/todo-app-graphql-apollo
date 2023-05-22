import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./App.css";
import TodoCard from "./components/TodoCard";

// Create a GraphQL query to fetch todos
const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

// Create a GraphQL mutation to add a todo
const ADD_TODO = gql`
  mutation ($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const App = () => {
  // New Todo Title State
  const [title, setTitle] = useState("");

  // Fetch todos using useQuery hook
  const { loading, error, data } = useQuery(GET_TODOS);

  // Add a new todo using useMutation hook
  const [addTodo] = useMutation(ADD_TODO);

  // Function to set Todo Title comming from the Input Element
  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to Add Todo
  const handleAddTodo = () => {
    addTodo({
      variables: { title: title },
      refetchQueries: [{ query: GET_TODOS }],
    });

    setTitle("");
  };

  return (
    <div className="App">
      <h2 className="text-[2rem] font-bold text-center mb-10">
        Todo App using Graphql & Apollo Server
      </h2>
      <div className="flex justify-center gap-5 items-center">
        <input
          placeholder="Enter Todo Title"
          className="rounded-lg border p-2 outline-none"
          type="text"
          value={title}
          onChange={handleInputChange}
        />
        <button
          className="bg-teal-600 text-[1rem] font-bold p-2 rounded-lg text-white"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="w-full mt-10 mx-auto">
        <h2 className="text-[2rem] font-bold my-2 text-center">Todos</h2>
        {loading ? (
          <div className="rounded-lg shadow-lg p-3">
            <p className="text-[1rem] text-center">Loading...</p>
          </div>
        ) : (
          data?.todos?.lenght === 0 && (
            <div className="rounded-lg shadow-lg p-3">
              <p className="text-[1rem] text-center">No Todo Found!</p>
            </div>
          )
        )}
        {error && (
          <div className="rounded-lg shadow-lg p-3">
            <p className="text-[1rem] text-center">{error?.message}</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {data?.todos?.map((todo) => (
            <TodoCard key={todo?.id} item={todo} GET_TODOS={GET_TODOS} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
