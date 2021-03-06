import React from "react";
import Header from "../Components/Header";
import Page from "../Components/Page";

import Card from "../Components/Card";

// Contentful
import { createClient } from "contentful";

import Footer from "../Pages/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";

import Helmet from "react-helmet";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_SECRET,
});

function PostsScreen() {
  const [posts, setPosts] = React.useState(null);

  React.useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const response = await client.getEntries({ content_type: "page" });
      if (!shouldCancel && response) {
        setPosts(response.items);
      }
    };
    call();
    return () => {
      shouldCancel = true;
    };
  }, []);

  if (!posts) {
    return (
      <main
        className="w-full ml-auto text-primarygrey dark:text-codewhite"
        role="main"
      >
        <Header solid={true} />
        <Page variant="LIGHT">
          {/* <p className="flex justify-center w-full text-2xl text-codewhite">
          Loading...
        </p> */}
        </Page>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Posts | Nathan Davenport's Portfolio</title>

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Posts | Nathan Davenport's Portfolio"
          />
          <meta
            property="og:image"
            content="https://nathandaven.com/static/media/profile.ee3ff26a.jpeg"
          />
          <meta
            property="og:site_name"
            content="Posts | Nathan Davenport's Portfolio"
          />

          <meta
            name="twitter:title"
            content="Posts | Nathan Davenport's Portfolio"
          />
          <meta
            name="twitter:description"
            content="Nathan Davenport is an aspiring front-end developer, UI/UX designer, and Georgia Tech student located in Midtown, Atlanta."
          />
          <meta
            name="twitter:image"
            content="https://nathandaven.com/static/media/profile.ee3ff26a.jpeg"
          />
        </Helmet>
        <main
          className="w-full ml-auto text-primarygrey dark:text-codewhite"
          role="main"
        >
          <Header solid={true} />
          <Page variant="LIGHT">
            <div className="w-full font-sans text-center">
              <p className="pb-3">No posts at this time! Check back later :)</p>
              <Link to="/">
                <p className="pt-3 transform hover:scale-110">
                  <b>Back to home ></b>
                </p>
              </Link>
            </div>
          </Page>
        </main>
      </>
    );
  }

  function formatDate(date) {
    date = new Date(date);
    return dateFormat(date, "fullDate");
  }

  return (
    <>
      <Helmet>
        <title>Posts | Nathan Davenport's Portfolio</title>

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Posts | Nathan Davenport's Portfolio"
        />
        <meta
          property="og:image"
          content="https://nathandaven.com/static/media/profile.ee3ff26a.jpeg"
        />
        <meta
          property="og:site_name"
          content="Posts | Nathan Davenport's Portfolio"
        />

        <meta
          name="twitter:title"
          content="Posts | Nathan Davenport's Portfolio"
        />
        <meta
          name="twitter:description"
          content="Nathan Davenport is an aspiring front-end developer, UI/UX designer, and Georgia Tech student located in Midtown, Atlanta."
        />
        <meta
          name="twitter:image"
          content="https://nathandaven.com/static/media/profile.ee3ff26a.jpeg"
        />
      </Helmet>
      <main
        className="w-full ml-auto bg-codewhitedark dark:bg-primarygrey text-primarygrey dark:text-codewhite"
        role="main"
      >
        <Header solid={true} />
        <Page>
          <div className="my-20"></div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.2,
                },
              },
            }}
          >
            <div className="my-20 w-full text-left">
              <h1 className="text-4xl pb-10">
                <b>Check out my most recent posts!</b>
              </h1>
              <h4 className="py-2 text-2xl">Pick my brain for a bit:</h4>
            </div>
          </motion.div>
          <div className="mb-10">
            {posts.map((post) => (
              <motion.div
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  },
                }}
              >
                <Card variant="LIGHT" key={post.fields.title.toString()}>
                  <div className="flex flex-col md:flex-row justify-between py-6">
                    <div className="flex flex-col md:flex-row justify-start text-left font-sans">
                      <img
                        className="w-full md:w-48 h-full rounded-lg shadow-lg object-cover"
                        src={post.fields.logo.fields.file.url}
                        alt="Post logo"
                      />
                      <div class="md:pl-6 pt-6 md:pt-0">
                        <h1 className="text-2xl">
                          <b>{post.fields.title}</b>
                        </h1>
                        <h2 className="text-xl">
                          <span>{formatDate(post.sys.updatedAt)}</span>
                          {/* <span>{post.fields.date}</span> */}
                        </h2>
                        <p className="pt-4">{post.fields.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center  pt-6 md:pt-0 md:pr-2">
                      <Link
                        className="w-full"
                        to={"/posts/" + post.fields.slug}
                        post={post}
                        title={post.fields.title}
                      >
                        <button className="w-full px-6 py-2 mx-2 my-1 rounded-md bg-green-600 hover:bg-green-700  text-white  text-md font-sans drop-shadow-md">
                          Read More >
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className=""></div>
        </Page>
        <Footer />
      </main>
    </>
  );
}

export default PostsScreen;
