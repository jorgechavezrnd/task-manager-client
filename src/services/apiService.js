//const api = 'http://localhost:3000/api';
const api = 'https://task-manager-server-s54w.onrender.com/api';

exports.get = async (url, token) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'Application/json',
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}${url}`, options);
  const result = await response.json();

  return { status:response.status, response: result };
};

exports.post = async (url, request, token) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'Application/json'
    },
    body: JSON.stringify(request),
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}${url}`, options);
  const result = await response.json();

  return { status:response.status, response: result };
};

exports.put = async (url, request, token) => {
  const options = {
    method: 'PUT',
    headers: {
      'content-type': 'Application/json'
    },
    body: JSON.stringify(request),
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}${url}`, options);
  const result = await response.json();

  return { status:response.status, response: result };
};

exports.delete_ = async (url, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'Application/json'
    },
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}${url}`, options);
  const result = await response.json();

  return { status:response.status, response: result };
};
