export const getTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
}

export const createTodo = (payload: { userId: number; title: string; completed?: boolean }) => {
  return fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}