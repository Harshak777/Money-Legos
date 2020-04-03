const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var hash=1;

app.post("/", (req, res) => {
	//res.send({ message: "We did it!" });
	hash = req.body.hash
	console.log(hash)
  });


app.post("/hash", (req, res) => {
	res.send({hash:hash});
	//console.log(hash)
  });

app.listen(port, () => {
    console.log(`server is listning on port ${port}`);
});
