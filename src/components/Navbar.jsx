import React, { useState, useEffect, useRef } from "react";
import { Person, Menu } from "@mui/icons-material";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import navLogo from "../../public/assets/logo.png";

const Navbar = () => {
  // State for managing dropdown menu visibility
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Redux state and dispatch
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Reference for the dropdown menu element
  const dropdownRef = useRef(null);

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Close dropdown when link inside it is clicked
  const handleLinkClick = () => {
    setDropdownMenu(false);
  };

  // Function to handle clicking on service or contact link
  const handleSectionLinkClick = (sectionId) => {
    let offsetValue = 0;

    // Adjust offset based on section ID
    if (sectionId === "contact") {
      offsetValue = -190;
    } else if (sectionId === "services") {
      offsetValue = 50;
    }

    // Check if the user is on the homepage
    if (window.location.pathname !== "/") {
      // Navigate to the homepage
      navigate("/");
      // Wait for the navigation to complete
      setTimeout(() => {
        // Scroll to the desired section after navigation
        scroller.scrollTo(sectionId, {
          duration: 2500, // Adjust duration as needed
          smooth: "easeInOutQuart", // Adjust smoothness as needed
          offset: offsetValue, // Adjust offset as needed
        });
      }, 500); // Adjust delay as needed
    } else {
      // User is already on the homepage, scroll to the section
      scroller.scrollTo(sectionId, {
        duration: 2500, // Adjust duration as needed
        smooth: "easeInOutQuart", // Adjust smoothness as needed
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        {/* Logo */}
        <RouterLink to="/">
          <img src={navLogo} alt="logo" />
        </RouterLink>

        {/* Navbar right section */}
        <div className="navbar_right">
          {/* ScrollLink for services */}
          <ScrollLink
            to="services"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={50}
            duration={2500}
            className="host"
            onClick={() => {
              handleSectionLinkClick("services");
              handleLinkClick();
            }}
          >
            სერვისები
          </ScrollLink>

          {/* ScrollLink for contact */}
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-200} // Decrease the offset to scroll slightly higher
            duration={2500}
            className="host"
            onClick={() => {
              handleSectionLinkClick("contact");
              handleLinkClick();
            }}
          >
            კონტაქტი
          </ScrollLink>

          {/* Conditional render based on user authentication */}
          {user ? null : (
            <RouterLink to="register" className="host">
              რეგისტრაცია
            </RouterLink>
          )}
        </div>

        {/* Button for account dropdown */}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu />
          {!user ? (
            <Person />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {/* Dropdown menu */}
        {dropdownMenu && (
          <div className="navbar_right_accountmenu" ref={dropdownRef}>
            <div className="dropdown">
              {/* ScrollLink inside dropdown */}
              <ScrollLink
                onClick={() => {
                  handleSectionLinkClick("services");
                  handleLinkClick();
                }}
                to="services"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={2500}
                className="toast"
              >
                სერვისები
              </ScrollLink>

              {/* ScrollLink inside dropdown */}
              <ScrollLink
                onClick={() => {
                  handleSectionLinkClick("contact");
                  handleLinkClick();
                }}
                to="contact"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={-80} // Decrease the offset to scroll slightly higher
                duration={2500}
                className="toast"
              >
                კონტაქტი
              </ScrollLink>
            </div>

            {/* Conditional render based on user authentication */}
            {user ? (
              <>
                <RouterLink to="user_orders" onClick={handleLinkClick}>
                  ჩემი შეკვეთები
                </RouterLink>
                <RouterLink
                  to="/"
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                >
                  ანგარიშიდან გასვლა
                </RouterLink>
              </>
            ) : (
              <>
                <RouterLink to="/login" onClick={handleLinkClick}>
                  შესვლა
                </RouterLink>
                <RouterLink to="/register" onClick={handleLinkClick}>
                  რეგისტრაცია
                </RouterLink>
              </>
            )}
          </div>
        )}
      </div>

      {/* Admin section */}
      {user && user.role === "ADMIN" && (
        <div
          className="flex gap-4 justify-center items-center bg-blue-500 text-white p-8 v-full"
          style={{ flexWrap: "wrap" }}
        >
          {/* Link to admin page */}
          <Link
            to="/admin"
            className="text-white font-bold font-lg hover:text-black"
          >
            შეკვეთები
          </Link>

          {/* Link to users page */}
          <Link
            to="/userspage"
            className="text-white font-bold font-lg hover:text-black"
          >
            მომხმარებლები
          </Link>

          {/* Link to administrators page */}
          <Link
            to="/administrators"
            className="text-white font-bold font-lg hover:text-black"
          >
            ადმინისტრატორები
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
