import React from "react"

import ecoFrndlyIcon1 from "./images/ecoFrndlyIcon1.svg"
import fastIcon1 from "./images/fastIcon1.svg"
import secureIcon21 from "./images/secureIcon21.svg"

const Rectangle19 = (props) => {
  return (
    <div className="card-23">
      <div className="div-15">
        <span className="span-15">{props.whyAlgorand || "Why Algorand?"}</span>
        <div className="div-16">
          <img className="img-6" src={ecoFrndlyIcon1} />
          <img className="img-7" src={fastIcon1} />
          <img className="img-8" src={secureIcon21} />
        </div>
      </div>
      <div className="div-26">
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
  )
}
export default Rectangle19