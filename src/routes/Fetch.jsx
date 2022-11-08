import { Suspense } from 'react';
import { Await, defer, useAsyncError, useLoaderData } from 'react-router-dom';
import Contacts from '../components/Contacts';
import { getSlowPosts } from '../contacts';

export async function loader({ request, params }) {
  const contactsPromise = getSlowPosts();
  return defer({
    contacts: contactsPromise,
  });
}

function ErrorElement() {
  const error = useAsyncError();

  return (
    <p>
      Uh Oh, something went wrong! {error?.status}: {error?.message}
    </p>
  );
}

export default function Fetch() {
  const fetchedContacts = useLoaderData();

  return (
    <div style={{ background: '#cecece' }}>
      <Suspense fallback={<p>Loading data...</p>}>
        <Await resolve={fetchedContacts.contacts} errorElement={<ErrorElement />}>
          {(contacts) => <Contacts contacts={contacts} />}
        </Await>
      </Suspense>
    </div>
  );
}
