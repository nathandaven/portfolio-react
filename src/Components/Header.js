// React
import React from "react";
// import { motion } from "framer-motion";
import Socials from "./Socials";

// Media and Icons

// React Router
import { HashLink } from "react-router-hash-link";
import classNames from "classnames";
import { Link } from "react-router-dom";

// Header Component
function Header(props) {
  const [color, setColor] = React.useState(0);

  React.useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll(event) {
    if (props.isHomePage === true) {
      let tag = "";
      if (window.pageYOffset > 600) {
        tag = "text-codewhite  mix-blend-exclusion ";
      } else {
        tag = " text-darkgrey";
      }
      setColor(tag);
    } else {
      setColor("text-codewhite dark:text-codewhite  mix-blend-exclusion ");
    }
  }

  return (
    <header
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 justify-center items-center",
        props.solid ? "" : color,
        props.solid ? "bg-codewhite dark:bg-darkgrey shadow-md" : ""
      )}
    >
      {/* bg-codewhite shadow-md */}
      <nav className="container mx-auto px-4 xl:px-40 flex justify-center items-center h-16  ">
        {/* Logo / title */}
        <div className="flex-1 text-left  hidden sm:contents">
          <div className="flex-1 flex ">
            <HashLink
              smooth
              to="/#home"
              className="text-xl text-left transform hover:scale-110"
            >
              <b>Nathan Davenport</b>
            </HashLink>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 flex flex-auto">
          <HashLink
            smooth
            to="/#home"
            className="flex-1 flex-auto text-center transform hover:scale-110"
          >
            Home
          </HashLink>
          <Link
            to="/photobook"
            className="flex-1 flex-auto text-center transform hover:scale-110"
          >
            Photobook
          </Link>
          <Link
            to="/posts"
            className="flex-1 flex-auto text-center transform hover:scale-110"
          >
            Blog
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex-1 text-right hidden md:contents">
          <Socials />
        </div>
      </nav>
    </header>
  );
}

export default Header;
