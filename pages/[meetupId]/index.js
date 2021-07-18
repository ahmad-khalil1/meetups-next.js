import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  const { meetupData } = props;
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export default MeetupDetails;

export const getStaticProps = async context => {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://ahmad:123@cluster0.kf5gw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  // const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  console.log(selectedMeetup); // printed in terminal not in the browser developer tools because it was renderd in the server
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://ahmad:123@cluster0.kf5gw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};
