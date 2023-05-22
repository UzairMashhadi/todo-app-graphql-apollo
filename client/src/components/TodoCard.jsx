import React from "react";
import { useMutation, gql } from "@apollo/client";

const MARK_TODO_AS_COMPLETED = gql`
  mutation MarkTodoAsCompleted($id: ID!) {
    markTodoAsCompleted(id: $id) {
      id
      completed
    }
  }
`;

const MARK_TODO_AS_UNCOMPLETED = gql`
  mutation MarkTodoAsUncompleted($id: ID!) {
    markTodoAsUncompleted(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

function TodoCard({ item, GET_TODOS }) {
  // Mark Todo State

  // Mark Todo as Completed using useMutation Hook
  const [markTodoAsCompleted] = useMutation(MARK_TODO_AS_COMPLETED);

  // Mark Todo as Uncompleted using useMutation Hook
  const [markTodoAsUncompleted] = useMutation(MARK_TODO_AS_UNCOMPLETED);

  // Delete Todo using useMutation Hook
  const [deleteTodo] = useMutation(DELETE_TODO);

  // Function to mark Todo as Completed
  const handleMarkCompleted = (e) => {
    const completed = e.target.checked;
    if (completed) {
      markTodoAsCompleted({
        variables: { id: item?.id },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } else {
      markTodoAsUncompleted({
        variables: { id: item?.id },
        refetchQueries: [{ query: GET_TODOS }],
      });
    }
  };

  // Function to Delete a Todo
  const handleDelete = (id) => {
    deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  return (
    <div className="flex justify-between shadow-lg p-5 rounded-lg">
      <div className="flex items-center gap-5">
        <input
          onChange={handleMarkCompleted}
          className="mr-2 cursor-pointer w-[1.4rem] h-[1.4rem]"
          type="checkbox"
          checked={item?.completed}
        />
        <p
          className={`text-[1rem] capitalize ${
            item?.completed && "line-through text-gray-400"
          }`}
        >
          {item?.title}
        </p>
      </div>
      <button
        onClick={() => handleDelete(item?.id)}
        className="bg-[red] rounded-lg text-[1rem] text-white p-2"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoCard;
