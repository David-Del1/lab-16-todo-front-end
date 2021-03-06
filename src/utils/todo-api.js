import request from 'superagent';
 

export async function signUp(credentials) {
  
  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(credentials);
  console.log(response.body);
  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function signIn(credentials) {
  const response = await request.post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getTodos() {
  const response = await request
    .get('/api/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteTodo(id) {
  const response = await request
    .delete(`/api/todos/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function completedTodo(todo) {
 
  const response = await request
    .put(`/api/todos/${todo.id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({
      task: todo.task,
      completed: true
    });

  return response.body;
}

export async function addTodo(todo) {
  const response = await request
    .post('/api/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send({
      task: todo.task,
      completed: false
    });

  return response.body;
}