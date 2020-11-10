module.exports = (client) => {
    client.cap = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
}