"use client";
import { gql, useQuery } from "@apollo/client";
import { Loader2Icon } from "lucide-react";

interface Todo {
  title: string;
  user: {
    name: string;
  };
}

const HomePage = () => {
  const query = gql`
    query GetTodos {
      getTodos {
        title
        user {
          name
        }
      }
    }
  `;

  const { data, loading } = useQuery(query);

  return (
    <div className="py-5 px-10 bg-black min-h-screen w-full text-white">
      <h1 className="text-3xl font-bold">Todos</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full pt-20">
          <Loader2Icon className="size-16 animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-3 my-10">
          {data &&
            data.getTodos.map((todo: Todo, index: number) => (
              <div key={index} className="border p-3 rounded-md">
                <h2 className="font-semibold">{todo.title}</h2>
                <p className="text-sm mt-2">User: {todo.user.name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
