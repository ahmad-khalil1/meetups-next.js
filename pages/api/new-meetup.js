import { MongoClient } from "mongodb";
// /api/new-meetup
// POST /api/new-meetup
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body: data } = req;
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://ahmad:123@cluster0.kf5gw.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);
      console.log(result);
      client.close();
      res.status(201).json({ message: "Meetup inserted" });
    } catch (e) {
      console.log(e);
    }
  }
};

export default handler;
