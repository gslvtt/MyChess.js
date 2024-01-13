const express = require('express');
const app = express();
const PORT = 3000;

console.log(app);
app.listen(PORT, () => {
  console.log(`MyChess listening on port ${PORT}`);
});