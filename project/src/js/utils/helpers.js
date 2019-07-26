function save(data) {
  const string = JSON.stringify(data);

  localStorage.setItem('token', string);
}

function load() {
  const string = localStorage.getItem('token');
  const data = JSON.parse(string);

  return data;
}

export { load, save } ;