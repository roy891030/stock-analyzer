<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/stocks-visualization">Stocks Visualization</router-link></li>
        <li><router-link to="/recommended-stocks">Recommended Stocks</router-link></li>
        <li><router-link to="/ai-calculator">AI Calculator</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

nav {
  background-color: #333;
  padding: 10px 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 15px;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #555;
  border-radius: 5px;
}

nav a.router-link-exact-active {
  background-color: #555;
  border-radius: 5px;
}
</style>
