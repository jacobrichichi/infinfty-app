import React from "react"
import Explore from "./Explore"
import Join from "./Join"
import Navbar from "./Navbar"

import logo from "./images/logo.png"
import searchBarIcon from "./images/searchBarIcon.png"
import accountImg from "./images/accountImg.png"
import advertisement from "./images/advertBg.png"
import ecoFrndlyIcon1 from "./images/ecoFrndlyIcon1.png"
import fastIcon1 from "./images/fastIcon1.png"
import secureIcon21 from "./images/secureIcon21.png"

const Desktop = (props) => {
  return (
    <div className="div-2">
      <div className="div-3">
        <img className="img-1" src={logo} />
        <div className="div-4">
          <img className="img-2" src={searchBarIcon} />
          <span className="span-1">
            {props.searchForItemsAndTags || "Search for items and tags"}
          </span>
        </div>
        <span className="span-2">Explore</span>
        <span className="span-2">{props.inventory || "Inventory"}</span>
        <span className="span-2">{props.connect || "Connect"}</span>
        <span className="span-2">{props.hiName || "Hi, name"}</span>
        <img className="img-3" src={accountImg} />
      </div>
      <img className="img-4" src={advertisement} />
      <div className="div-9">
        <Navbar />
        <div className="div-10">
          <span className="span-2">
            {props.monaLisaCollection || "Mona Lisa Collection"}
          </span>
          <span className="span-2">
            {props.screamCollection || "Scream Collection"}
          </span>
          <span className="span-11">
            {props.monkeyCollection || "Monkey Collection\n"}
          </span>
        </div>
      </div>
      <div className="div-11">
        <Navbar />
        <Navbar />
        <Navbar />
      </div>
      <div className="div-12">
        <span className="span-2">
          {props.num20000Algo20 || "20000 Algo, +20%"}
        </span>
        <span className="span-2">
          {props.num23786328Algo50 || "23786328 Algo, -5.0%"}
        </span>
        <span className="span-14">
          {props.num2Algo1049379430 || "2 Algo, -1049379430%"}
        </span>
      </div>
      <div className="div-13" />
      <div className="card-14">
        <div className="div-15">
          <span className="span-15">
            {props.whyAlgorand || "Why Algorand?"}
          </span>
          <div className="div-16">
            <img className="img-6" src={ecoFrndlyIcon1} />
            <img className="img-7" src={fastIcon1} />
            <img className="img-8" src={secureIcon21} />
          </div>
        </div>
        <div className="div-5">
          <span className="span-2">{props.ecoFriendly || "Eco-Friendly"}</span>
          <span className="span-2">
            {props.fastTransactions || "Fast Transactions"}
          </span>
          <span className="span-18">{props.secure || "Secure"}</span>
        </div>
        <div className="div-18">
          <span className="span-2">
            {props.algorandSPoSAlgorithmMeansThatEveryTransactionCommitedIsMuchMoreEcoFriendlyThenItSPoWCounterparts ||
              "Algorand’s PoS algorithm means that every transaction commited is much more eco-friendly then it’s PoW counterparts"}
          </span>
          <span className="span-2">
            {props.theAbilityToProcessOver1000TransactionsPerSecond100XFasterThenETHMeaningYourBuysAndSellsCanBeVerifiedWithinSeconds ||
              "The ability to process over 1000 transactions per second,  100x faster then ETH, meaning your buys and sells can be verified within seconds"}
          </span>
          <span className="span-18">
            {props.theBlockchainTechnologyCreatedByMITProfessorAndTuringAwardWinnerSilvioMicaliWasSpeciallyCraftedToIncentivizeBenevolentTransactionProcessing ||
              "The blockchain technology, created by MIT Professor and Turing Award winner Silvio Micali, was specially crafted to incentivize benevolent transaction processing"}
          </span>
        </div>
      </div>
    </div>
  )
}
export default Desktop