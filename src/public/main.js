// common functions
import allMetals from "./data-files/metals-data.js";
import { toPubChemFormula } from "./modules/utils/prasingFormula.js";
import { balancingEquations } from "./modules/utils/balancing.js";
import {
  findSimplifiedCharge,
  fixingQ,
  filterByVelance,
  gettingVelance,
  getTheCategory,
  tranferToFormula,
} from "./modules/utils/sharedFunctions.js";

// combination reaction files
import is_it_possible from "./modules/combination-reaction/testing.js";
import combinationReaction from "./modules/combination-reaction/combination.js";
import combiRules from "./data-files/combination-rules.js";

// decomposition reaction files
import decompositionReaction from "./modules/decomposition-reaction/decomposition.js";
import {
  ammoniumProductPraser,
  ammoniumExceptionProduct,
  getElements,
} from "./data-files/decomposition-utils.js";
import commonOxidationStates from "./data-files/commonOxidations.js";
import decomRules from "./data-files/decomposition-rules.js";

// single displacement reaction files
import single_displaceReaction from "./modules/single-displacement-reaction/single-displace.js";
import singDispRules from "./data-files/single_displace-rules.js";
import { metalic_series, halous_series } from "./data-files/activity-series.js";
import gettingSaltyProduct from "./data-files/single_displace-utils.js";

// double displacement reaction files
import doubleDispRules from "./data-files/double_displace-rules.js";
import double_displaceReaction from "./modules/double-displacement-reaction/double-displace.js";
import {
  getDoubleSaltyProducts,
  getAcidicPartedProduct,
} from "./data-files/double_displace-utils.js";

//import EqReactant from "./testing/equations.js";
//import test from "./testing/testing-reactions.js";

// UI components file
import { UIComponents } from "./UI/UI.js";

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const atomicLength = [
  [
    "Oxygen",
    "Chlorine",
    "Hydrogen",
    "Iodine",
    "Bromine",
    "Fluorine",
    "Nitrogen",
  ],
  ["Phosphorus", "Arsenic", "Antimony"],
  ["Sulfur", "Selenium", "Tellurium"],
];

const atomicLengthBySymbol = [
  [2, "O", "Cl", "H", "I", "Br", "F", "N"],
  [4, "P", "As", "Sb"],
  [8, "S", "Se", "Te"],
];

async function getCompound(formula, formula2) {
  try {
    const response = await fetch(
      `/api/pubchem/compound/fastformula/${formula}/JSON`,
    );
    console.log(
      `FETCHED: 1) http://localHost:3000/api/pubchem/compound/fastformula/${formula}/JSON : ${response.ok}`,
    );

    if (!response.ok) {
      const response2 = await fetch(
        `/api/pubchem/compound/name/${formula2}/JSON`,
      );
      console.log(
        `FETCHED: 2) http://localHost:3000/api/pubchem/compound/name/${formula2}/JSON : ${response2.ok}`,
      );

      if (!response2.ok) {
        const response3 = await fetch(
          `/api/pubchem/compound/fastformula/${formula2}/JSON`,
        );
        console.log(
          `FETCHED: 3) http://localHost:3000/api/pubchem/compound/fastformula/${formula2}/JSON : ${response3.ok}`,
        );

        if (!response3.ok) {
          return { success: false, data: `HTTP: ${response3.status}` };
        }

        const data3 = await response3.json();

        if (!data2.PC_Compounds || data2.PC_Compounds.length === 0) {
          return {
            success: false,
            data: "No compounds found for this formula",
          };
        }

        return { success: true, data: data3 };
      }

      const data2 = await response2.json();

      if (!data2.PC_Compounds || data2.PC_Compounds.length === 0) {
        return { success: false, data: "No compounds found for this formula" };
      }

      return { success: true, data: data2 };
    }

    const data = await response.json();

    if (!data.PC_Compounds || data.PC_Compounds.length === 0) {
      return { success: false, data: "No compounds found for this formula" };
    }

    return { success: true, data: data };
  } catch (error) {
    if (error.name === "SyntaxError") {
      return { success: false, data: "Invalid JSON response from server" };
    }
    return { success: false, data: `Network error: ${error.message}` };
  }
}

async function getElement(element) {
  try {
    const response = await fetch("/api/elements");
    let data;
    if (!response.ok) {
      throw new Error("couldn't fetch data from the Periodic Table API");
    } else {
      const elements = await response.json();
      elements.forEach((ele) => {
        if (ele.symbol === element) {
          data = ele;
        }
      });
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function predictEquation(theType, r1, r2) {
  if (theType === "combination") {
    // combination reaction

    return await combinationReaction(
      r1,
      r2,
      getElement,
      is_it_possible,
      getTheCategory,
      filterByVelance,
      gettingVelance,
      allMetals,
      atomicLength,
      getCompound,
      toPubChemFormula,
      tranferToFormula,
      getElements,
      commonOxidationStates,
      combiRules,
      fixingQ,
      balancingEquations,
    );
  } else if (theType === "decomposition") {
    // decomposition reaction

    return await decompositionReaction(
      r1,
      ammoniumProductPraser,
      ammoniumExceptionProduct,
      commonOxidationStates,
      atomicLength,
      getElement,
      getTheCategory,
      decomRules,
      getElements,
      allMetals,
      getCompound,
      toPubChemFormula,
      balancingEquations,
      fixingQ,
      tranferToFormula,
      atomicLengthBySymbol,
      findSimplifiedCharge,
    );
  } else if (theType === "single_displacement") {
    // single displacement reaction

    return await single_displaceReaction(
      r1,
      r2,
      getElement,
      getElements,
      commonOxidationStates,
      allMetals,
      metalic_series,
      halous_series,
      singDispRules,
      getCompound,
      toPubChemFormula,
      tranferToFormula,
      atomicLengthBySymbol,
      fixingQ,
      balancingEquations,
      gettingSaltyProduct,
      findSimplifiedCharge,
    );
  } else if (theType === "double_displacement") {
    // double displacement reaction

    return await double_displaceReaction(
      r1,
      r2,
      doubleDispRules,
      commonOxidationStates,
      allMetals,
      getElements,
      atomicLengthBySymbol,
      getDoubleSaltyProducts,
      getAcidicPartedProduct,
      getCompound,
      toPubChemFormula,
      findSimplifiedCharge,
      fixingQ,
      balancingEquations,
      tranferToFormula,
    );
  }
}

//console.log(await test(predictEquation, EqReactant));

document.addEventListener("DOMContentLoaded", () => {
  UIComponents(MathJax, predictEquation);
});
