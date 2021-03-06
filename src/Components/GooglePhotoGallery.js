import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function GooglePhotosGallery() {
  const [images, setImages] = React.useState(null);
  React.useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const response = await axios.get(
        "https://simple-vine-knife.glitch.me/XaVbN7HVYqgGagk66"
      );
      if (!shouldCancel && response.data && response.data.length > 0) {
        setImages(
          response.data.map((url) => ({
            original: `${url}=w1200-h800-c`,
            thumbnail: `${url}=w120-h80-c`,
          }))
        );
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  return images ? (
    <div className="container ">
      <ImageGallery
        items={images}
        showThumbnails={true}
        showNav={false}
        lazyLoad={true}
        infinite={true}
        autoPlay={true}
        showFullscreenButton={false}
        slideInterval={6000}
      />
    </div>
  ) : (
    <>
      <div className="flex text-center justify-center font-sans text-md py-20 text-codewhite">
        <p>Loading...</p>
      </div>
    </>
  );
}

export default GooglePhotosGallery;
