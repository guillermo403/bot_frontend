const saveGuild = ($http, id, name) => {
  return new Promise((resolve, reject) => {
    $http
    .post('/guild/get', { id: id, name: name })
    .then(async (response) => {
      localStorage.setItem('guild', JSON.stringify(response.data));
      resolve();
    });
  });
}

const reloadGuild = async ($http) => {
  let id = JSON.parse(localStorage.getItem('selectedGuild')).id;
  let name = JSON.parse(localStorage.getItem('selectedGuild')).name;
  await saveGuild($http, id, name);
}

module.exports = {
  saveGuild,
  reloadGuild,
}