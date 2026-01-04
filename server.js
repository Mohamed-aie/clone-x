const app = require('./clone x/app');
const ENV = require('./config/env');

//PORT
const PORT = ENV.PORT || 8080;
//LISTEN
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});