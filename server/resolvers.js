// Sample todo data
let todos = [
  { id: '1', title: 'Learn GraphQL', completed: false },
  { id: '2', title: 'Build Apollo Server', completed: true },
];

// Define the resolvers
const resolvers = {
  // Query to get Todos
  Query: {
    todos: () => todos,
  },
  // Mutations to AddTodo, MarkAsComplete and deleteTodo
  Mutation: {
    // AddTodo Mutation
    addTodo: (parent, args) => {
      const newTodo = {
        id: String(todos.length + 1),
        title: args.title,
        completed: false,
      };

      todos.push(newTodo);
      return newTodo;
    },
    // Mark Todo As Completed Mutation
    markTodoAsCompleted: (parent, args) => {
      const todoIndex = todos.findIndex((todo) => todo.id === args.id);

      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      todos[todoIndex].completed = true;

      return todos[todoIndex];
    },
    // Mark Todo As UnCompleted Mutation
    markTodoAsUncompleted: (_, { id }) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        todos[todoIndex].completed = false;
        return todos[todoIndex];
      }
      return null;
    },
    // Delete Todo Mutation
    deleteTodo: (parent, args) => {
      const todoIndex = todos.findIndex((todo) => todo.id === args.id);

      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      const deletedTodo = todos.splice(todoIndex, 1)[0];

      return deletedTodo.id;
    },
  },
};

module.exports = resolvers