import { gql } from '@apollo/client';

export const GET_ALL_TODOS_FOR_USER = gql`
  query GetAllTodosForUser($userId: ID!) {
    getAllTodosForUser(userId: $userId) {
      id
      content
      isDone
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($userId: ID!, $content: String!) {
    createTodo(userId: $userId, content: $content) {
      id,
      content,
      isDone
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $isDone: Boolean!) {
    updateTodo(id: $id, isDone: $isDone)
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`