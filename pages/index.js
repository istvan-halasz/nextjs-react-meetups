import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Next JS Meetup</title>
        <meta name="description" content="Next JS React meetups list"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://Isti:kCdUzjNIMynTJAjF@cluster1.998sros.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetupsResponse = await meetupsCollection.find().toArray();

  const meetups = meetupsResponse.map((m) => ({
    title: m.title,
    address: m.address,
    image: m.image,
    id: m._id.toString(),
  }));
  client.close();

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 10,
  };
}

export default HomePage;
