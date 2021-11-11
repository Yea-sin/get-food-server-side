const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// get_food

//  X9WalMdNacDD4RVv

/* const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.quagy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */
const uri =
  "mongodb+srv://get_food:X9WalMdNacDD4RVv@cluster0.quagy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("get_food");
    const foodsCollection = database.collection("foods");
    const ordersCollection = database.collection("orders");

    // GET FOODS API
    app.get("/foods", async (req, res) => {
      const cursor = foodsCollection.find({});
      const foods = await cursor.toArray();

      res.send(foods);
    });

    // POST ORDERS API
    app.post("/orders", async (req, res) => {
      const order = req.body;

      const result = await ordersCollection.insertOne(order);
      res.json(result);
    });

    // POST FOODS API
    app.post("/foods", async (req, res) => {
      const foods = req.body;
      const result = await foodsCollection.insertOne(foods);

      res.json(result);
    });

    // DELETE API
    app.delete("/foods/:id", async (req, res) => {
      const id = req.params.id;
      // console.log("this is id", id);
      const query = { _id: ObjectId(id) };
      const foods = await foodsCollection.deleteOne(query);
      res.json(foods);
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Get Food Backend Server");
});

app.listen(port, () => {
  console.log("listesing to port", port);
});
