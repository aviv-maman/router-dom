import { Form, useFetcher, useLoaderData } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Error 404: Not Found',
    });
  }
  return contact;
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

export default function Contact() {
  const contact = useLoaderData();

  return (
    <div id='contact'>
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target='_blank' href={`https://twitter.com/${contact.twitter}`} rel='noreferrer'>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>

          {/* Delete Button:
              ==============
          When the user clicks the submit button:
          1. <Form> prevents the default browser behavior of sending a new POST request to the server, but instead emulates the browser by creating a POST request with client side routing
          2. The <Form action="destroy"> matches the new route at "contacts/:contactId/destroy" and sends it the request
          3. After the action redirects, React Router calls all of the loaders for the data on the page to get the latest values (this is "revalidation"). useLoaderData returns new values and causes the components to update! */}

          <Form
            method='post'
            action='destroy' //Since the form is rendered in contact/:contactId, then a relative action with destroy will submit the form to contact/:contactId/destroy when clicked
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}>
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher(); //useFetcher: Mutations Without Navigation (i.e. Favorite ★)
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
