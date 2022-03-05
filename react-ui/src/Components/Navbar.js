import React from "react"

import logo from "./images/logo.svg"
import searchBarIcon from "./images/searchBarIcon.svg"
import accountImg from "./images/accountImg.svg"

const Navbar = (props) => {
  return (
    <div className="div-19">
      <img className="img-1" src={logo} />
      <div className="div-4">
        <img className="img-2" src={searchBarIcon} />
        <span className="span-1">
          {props.searchForItemsAndTags || "Search for items and tags"}
        </span>
      </div>
      <span className="span-2">{props.explore || "Explore"}</span>
      <span className="span-2">{props.inventory || "Inventory"}</span>
      <span className="span-2">{props.connect || "Connect"}</span>
      <span className="span-2">{props.hiName || "Hi, name"}</span>
      <img className="img-3" src={accountImg} />
    </div>
  )
}
export default Navbar