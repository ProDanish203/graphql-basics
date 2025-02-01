import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `

    type User {
        id: ID!
        name: String!
        email: String!  
        username: String!
        phone: String!
        website: String!
    }

    type Todo {
        id: ID! 
        title: String!
        completed: Boolean!
        userId: ID!
        user: User
    }

    type Query {
        getTodos: [Todo]    
        getAllUsers: [User]    
        getUser(id: ID!): User
    }
    `,
    resolvers: {
      Todo: {
        user: async (todo) => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`
          );

          return data;
        },
      },

      Query: {
        getTodos: async () => {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );

          return data;
        },

        getAllUsers: async () => {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );

          return data;
        },

        getUser: async (parent, { id }: { id: string }) => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );

          return data;
        },
      },
    },
  });

  app.use(cors());
  app.use(bodyParser.json());

  await server.start();

  //   @ts-ignore
  app.use("/graphql", expressMiddleware(server));

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });
}

startServer();
