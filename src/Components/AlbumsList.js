// React
import React from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_SECRET,
});

function AlbumsList(props) {
  const [contentfulAlbums, setContentfulAlbums] = React.useState(null);

  React.useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const response = await client.getEntries({ content_type: "album" });
      if (!shouldCancel && response) {
        setContentfulAlbums(response.items);
      }
    };
    call();
    return () => {
      shouldCancel = true;
    };
  }, []);

  if (!contentfulAlbums) {
    return <p>Loading..</p>;
  }

  function updateCurrentAlbum(id) {
    props.setGallery(id);
  }

  if (contentfulAlbums.length === 0) {
    return (
      <div className="w-full font-sans text-left">
        <p className="pb-3">No albums at this time! Check back later :)</p>
        <Link to="/">
          <p className="pt-3 transform hover:scale-110">
            <b>Back to home ></b>
          </p>
        </Link>
      </div>
    );
  }

  // Header Component
  return (
    <>
      {contentfulAlbums.map((album) => (
        <button
          onClick={() => updateCurrentAlbum(album.fields.googlePhotosId)}
          className="text-left transform focus:scale-105 pb-2 pr-6"
          key={album.fields.slug}
        >
          {album.fields.title}
        </button>
      ))}
    </>
  );
}

export default AlbumsList;
