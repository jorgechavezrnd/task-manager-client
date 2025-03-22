import { get, post, put, delete_ } from './apiService';

export async function getTasksByUser(token, search, deadline, state) {
  let url = '/tasks';

  const parameters = [];

  if (search) {
    parameters.push(`search=${search}`);
  }

  if (deadline) {
    parameters.push(`limitedDeadline=${deadline}`);
  }

  if (state) {
    parameters.push(`state=${state}`);
  }

  if (parameters.length > 0) {
    url += `?${parameters.join('&')}`;
  }

  const response = await get(url, token);

  return response;
};

export async function createTask(task, token) {
  const response = await post('/tasks', task, token);

  return response;
}

export async function getTaskById(id, token) {
  const response = await get(`/tasks/${id}`, token);

  return response;
}

export async function updateTask(id, task, token) {
  const response = await put(`/tasks/${id}`, task, token);

  return response;
}

export async function deleteTask(id, token) {
  const response = await delete_(`/tasks/${id}`, token);

  return response;
}
