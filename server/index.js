const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const resolvers = require('./resolvers');
const typeDefs = fs.readFileSync('./scheme.gql', 'utf8');

// Create an instance of Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});