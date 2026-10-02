export async function UIComponents(MathJax, predictEquation) {
  const welcomeScreen = document.getElementById("welcome-screen");
  const toolScreen = document.getElementById("tool-screen");
  const btnEnter = document.getElementById("btn-enter");
  const btnBack = document.getElementById("btn-back");
  const btnPredict = document.getElementById("btn-predict");
  const typeSelector = document.getElementById("type-selector");
  const inpReactant1 = document.getElementById("inp-reactant-1");
  const inpReactant2 = document.getElementById("inp-reactant-2");
  const labelReactant2 = document.getElementById("label-reactant-2");
  const errorMsg = document.getElementById("error-msg");
  const outputArea = document.getElementById("output-area");

  let currentType = "combination";

  btnEnter.addEventListener("click", () => {
    welcomeScreen.classList.add("opacity-0", "-translate-y-10");
    setTimeout(() => {
      welcomeScreen.classList.add("hidden");
      toolScreen.classList.remove("hidden");
      setTimeout(() => {
        toolScreen.classList.remove("opacity-0", "translate-y-10");
      }, 50);
    }, 700);
  });

  btnBack.addEventListener("click", () => {
    toolScreen.classList.add("opacity-0", "translate-y-10");
    setTimeout(() => {
      toolScreen.classList.add("hidden");
      welcomeScreen.classList.remove("hidden");
      setTimeout(() => {
        welcomeScreen.classList.remove("opacity-0", "-translate-y-10");
      }, 50);
    }, 700);
  });

  let howMuch = 2;

  typeSelector.addEventListener("click", (e) => {
    const target = e.target.closest(".type-btn");
    if (!target) return;

    document.querySelectorAll(".type-btn").forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.add(
        "bg-white/50",
        "border-olive/20",
        "text-olive",
        "hover:bg-white/80",
      );
    });

    target.classList.add("active");
    target.classList.remove(
      "bg-white/50",
      "border-olive/20",
      "text-olive",
      "hover:bg-white/80",
    );

    currentType = target.getAttribute("data-type");

    if (currentType === "decomposition") {
      inpReactant2.disabled = true;
      inpReactant2.value = "";
      labelReactant2.textContent = "Optional Context";
      inpReactant2.placeholder = "N/A";
      howMuch = 1;
    } else {
      inpReactant2.disabled = false;
      labelReactant2.textContent = "Reactant Beta";
      inpReactant2.placeholder = "e.g. O2";
      howMuch = 2;
    }
  });

  btnPredict.addEventListener("click", async () => {
    const r1 = inpReactant1.value.trim();
    const r2 = inpReactant2.value.trim();

    if (howMuch === 1) {
      if (!r1) {
        errorMsg.textContent =
          "Please enter at least one reactant formula (e.g., H, MgO)";
        errorMsg.classList.remove("hidden");
        return;
      }
    } else {
      if (!r1 || !r2) {
        errorMsg.textContent =
          "Please enter two reactant formulas (e.g., H, MgO)";
        errorMsg.classList.remove("hidden");
        return;
      }
    }

    inpReactant1.value = "";
    inpReactant2.value = "";

    errorMsg.classList.add("hidden");

    const loaderCard = document.createElement("div");
    loaderCard.className =
      "flex flex-col items-center justify-center p-12 space-y-6 text-marble shadow-2xl border-4 border-terracotta/20 animate-reveal mb-6 relative";
    loaderCard.style.borderRadius = "11px";
    loaderCard.style.backgroundColor = "#4f654d";
    loaderCard.innerHTML = `
      <div class="relative py-4">
        <div class="w-16 h-16 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
      </div>
      <p class="font-display text-white tracking-widest uppercase text-sm">Transmuting...</p>
    `;
    outputArea.prepend(loaderCard);
    outputArea.scrollIntoView({ behavior: "smooth" });

    console.log(r1, r2);

    const reactionData = await predictEquation(currentType, r1, r2);
    console.log(reactionData);

    let equationsArray = [];
    let dataArray = [];
    let stociData = [];
    console.log(reactionData[0]);
    if (Array.isArray(reactionData) && reactionData[0] === undefined) {
      equationsArray.push(reactionData[1].symboledEquation);
    } else if (currentType === "combination") {
      if (Array.isArray(reactionData[0])) {
        equationsArray.push(reactionData[1].symboledEquation);
        dataArray.push(`
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            Texted Equation : ${reactionData[1].textedEquation}
          </div>
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal"> 
            Reactants :
          </div> 
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            1) ${reactionData[0][0].formula} : <br>
            name : ${reactionData[0][0].name} <br>
            cid : ${reactionData[0][0].cid} <br>
          </div>
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            2) ${reactionData[0][1].formula} : <br>
            name : ${reactionData[0][1].name} <br>
            cid : ${reactionData[0][1].cid} <br>
          </div>
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal"> 
            Product :
          </div> 
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            3) ${reactionData[0][2].formula} : <br>
            name : ${reactionData[0][2].name} <br>
            cid : ${reactionData[0][2].cid} <br>
          </div>
        `);
        let thatStoicData = {
          reactants: [],
          products: [],
        };
        for (let i = 0; i < reactionData[0].length - 1; i++) {
          const aReactant = reactionData[0][i];
          thatStoicData.reactants.push({
            formula: aReactant.formula,
            coefficient: aReactant.coefficient,
            mw: aReactant.weight,
          });
        }
        thatStoicData.products.push({
          formula: reactionData[0].at(-1).formula,
          coefficient: reactionData[0].at(-1).coefficient,
          mw: reactionData[0].at(-1).weight,
        });
        stociData.push(thatStoicData);
      } else {
        const itsAllData = reactionData[0];

        for (let i = 1; i < reactionData.length; i++) {
          const anEquation = reactionData[i];

          equationsArray.push(anEquation.equation);
          dataArray.push(`
            <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
              1) ${itsAllData.element1.symbol} : <br>
              Name : ${itsAllData.element1.name} <br>
              Gonfig : ${itsAllData.element1.config} <br>
              Group : ${itsAllData.element1.group} <br>
              Electronegativity : ${itsAllData.element1.electronegativity} <br>
              Charge : ${anEquation.fristElementCharge} <br>
            </div>
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
              2) ${itsAllData.element2.symbol} : <br>
              Name : ${itsAllData.element2.name} <br>
              Gonfig : ${itsAllData.element2.config} <br>
              Group : ${itsAllData.element2.group} <br>
              Electronegativity : ${itsAllData.element2.electronegativity} <br>
              Charge : ${anEquation.secondElementCharge} <br>
            </div>
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
              3) ${anEquation.productData.formula} : <br>
              Name : ${anEquation.productData.name === undefined ? "couldn't fetch" : anEquation.productData.name} <br>
              cid : ${anEquation.productData.cid} <br>
            </div>
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
              4) More Infomation : <br>
              Possiblity : ${itsAllData.equationData.possiablity} <br>
              Bond Type : ${itsAllData.equationData.bondingType} <br>
              Change in EN : ${itsAllData.equationData.deltaEN} <br>
              Conditions :  ${itsAllData.equationData.conditions} <br>
            </div>
          `);
          stociData.push({
            reactants: [
              {
                coefficient: anEquation.productData.coff[0],
                formula: itsAllData.element1.symbol,
                mw: itsAllData.element1.weight,
              },
              {
                coefficient: anEquation.productData.coff[1],
                formula: itsAllData.element2.symbol,
                mw: itsAllData.element2.weight,
              },
            ],
            products: [
              {
                coefficient: anEquation.productData.coff[2],
                formula: anEquation.productData.formula,
                mw: anEquation.productData.weight,
              },
            ],
          });
        }
      }
    } else if (currentType === "decomposition") {
      reactionData.forEach((anEquation) => {
        const compoundsData = Object.entries(anEquation[3]);

        let totalresult = "";
        const thisStoic = {
          products: [],
          reactants: [],
        };
        compoundsData.forEach((aCompound, i) => {
          if (i === 0) {
            thisStoic.reactants.push({
              coefficient: aCompound[1][3],
              mw: aCompound[1][2],
              formula: aCompound[1][1],
            });
          } else {
            thisStoic.products.push({
              coefficient: aCompound[1][3],
              mw: aCompound[1][2],
              formula: aCompound[1][1],
            });
          }
          totalresult += `
            <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
            <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
              ${aCompound[1][1]} : <br>
              name : ${aCompound[0]} <br>
              cid : ${aCompound[1][0]} <br>
            </div>
          `;
        });

        equationsArray.push(anEquation[1]);
        dataArray.push(`
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            texted Equation : ${anEquation[0]} <br>
          </div>
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            trigger : ${anEquation[2]} <br>
          </div>
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            compounds information : <br>
            ${totalresult}
          </div>
        `);
        stociData.push(thisStoic);
      });
    } else if (
      currentType === "single_displacement" ||
      currentType === "double_displacement"
    ) {
      const productsData = reactionData.products;
      const reactantsData = reactionData.reactants;

      let totalproducts = "";
      let productsStoic = [];
      for (let i = 1; i < productsData.length; i++) {
        const aProduct = productsData[i];

        totalproducts += `
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            ${aProduct.formula} : <br>
            name : ${aProduct.name} <br>
            cid : ${aProduct.cid} <br>
          </div>
        `;
        productsStoic.push({
          formula: aProduct.formula,
          coefficient: aProduct.coff,
          mw: aProduct.weight,
        });
      }

      let totalreactants = "";
      let reactantsStoic = [];
      for (let i = 0; i < reactantsData.length; i++) {
        const aReactant = reactantsData[i];

        totalreactants += `
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            ${aReactant.formula} : <br>
            name : ${aReactant.name} <br>
            cid : ${aReactant.cid} <br>
          </div>
        `;
        reactantsStoic.push({
          formula: aReactant.formula,
          coefficient: aReactant.coff,
          mw: aReactant.weight,
        });
      }

      stociData.push({
        reactants: reactantsStoic,
        products: productsStoic,
      });

      equationsArray.push(reactionData.equationData.symboledEquation);
      dataArray.push(`
        <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
          texted Equation : ${reactionData.equationData.textedEquation} <br>
        </div>
        <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
        <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
        <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
          (*) Reactants information : <br>
          ${totalreactants}
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          (*) Products information : <br>
          ${totalproducts}
        </div>
      `);
    }
    //}

    let loodingHere = true;
    equationsArray.forEach((anEquation, i) => {
      const thatEquationData = dataArray[i];
      const thatStoicData = stociData[i];

      const card = document.createElement("div");
      card.className =
        "reaction-card text-marble p-8 md:p-12 shadow-2xl border-4 border-terracotta/30 animate-reveal mb-6 relative";
      card.style.borderRadius = "11px";
      card.style.backgroundColor = "#4f654d";

      const hasStoic = !!(
        thatStoicData &&
        thatStoicData.reactants &&
        thatStoicData.products
      );

      card.innerHTML = `
        <div class="space-y-6">
          <!-- Close Button to dismiss this particular result card -->
          <button class="btn-close-card absolute top-4 right-4 text-white/50 hover:text-[#ffdfa9] transition-all duration-200 focus:outline-none cursor-pointer transform hover:scale-110" title="Remove Reaction">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative pr-6">
            <div class="text-base sm:text-lg md:text-2xl font-mono px-3 py-4 md:p-6 bg-white/5 rounded border overflow-x-auto scrollbar-hide text-center" style="border-color: #d6dcd0;">
              ${anEquation}
            </div>
          </div>
          
          <div class="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-marble/10">
            <button class="btn-toggle-info secondary-action-btn font-sans cursor-pointer" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
              Reaction Insights
            </button>
            ${
              hasStoic
                ? `
            <button class="btn-toggle-stoic secondary-action-btn font-sans cursor-pointer" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
              Stoichiometry
            </button>
            `
                : ""
            }
          </div>

          <div class="info-section hidden mt-8 text-left space-y-3 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5">
            <h3 class="text-xs uppercase tracking-[0.2em] text-[#ffdfa9] font-sans font-bold">Spectral Insights</h3>
            <p class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">${thatEquationData}</p>
          </div>

          ${
            hasStoic
              ? `
          <div class="stoic-calc hidden mt-8 text-left space-y-6 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5 font-sans">
            <div class="overflow-x-auto">
              <table class="w-full text-xs md:text-sm font-sans tracking-normal">
                <thead>
                  <tr class="text-marble/70 border-b border-marble/10 font-semibold">
                    <th class="py-3 text-left font-semibold">Compound</th>
                    <th class="py-3 text-center px-1 font-semibold">Coeff</th>
                    <th class="py-3 text-center px-1 font-semibold">Molar Mass</th>
                    <th class="py-3 text-center px-2 font-semibold">Moles</th>
                    <th class="py-3 text-center px-2 font-semibold">Weight (g)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">Reactants</td></tr>
                  ${thatStoicData.reactants
                    .map(
                      (r, idx) => `
                      <tr class="participant border-b border-marble/5 font-sans" data-coeff="${r.coefficient}" data-mw="${r.mw}" data-role="reagent">
                          <td class="py-4 font-mono normal-case font-bold text-white">${r.formula}</td>
                          <td class="py-4 text-center font-bold text-[#ffdfa9]">${r.coefficient}</td>
                          <td class="py-4 text-center text-marble/80">${r.mw.toFixed(2)}</td>
                          <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="r${idx}" placeholder="0"></td>
                          <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="r${idx}" placeholder="0"></td>
                      </tr>
                  `,
                    )
                    .join("")}
                  <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">Products</td></tr>
                  ${thatStoicData.products
                    .map(
                      (p, idx) => `
                      <tr class="participant border-b border-marble/5 font-sans" data-coeff="${p.coefficient}" data-mw="${p.mw}" data-role="product">
                          <td class="py-4 font-mono normal-case font-bold text-white">${p.formula}</td>
                          <td class="py-4 text-center font-bold text-[#ffdfa9]">${p.coefficient}</td>
                          <td class="py-4 text-center text-marble/80">${p.mw.toFixed(2)}</td>
                          <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="p${idx}" placeholder="0"></td>
                          <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="p${idx}" placeholder="0"></td>
                      </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
          `
              : ""
          }
        </div>
      `;

      if (loodingHere) {
        outputArea.replaceChild(card, loaderCard);
        loodingHere = false;
      } else {
        outputArea.prepend(card);
      }

      // Set up interactive features specifically for this *single* card
      const btnToggleStoic = card.querySelector(".btn-toggle-stoic");
      const btnToggleInfo = card.querySelector(".btn-toggle-info");
      const stoicCalc = card.querySelector(".stoic-calc");
      const infoSection = card.querySelector(".info-section");
      const btnCloseCard = card.querySelector(".btn-close-card");

      btnCloseCard.addEventListener("click", () => {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        card.style.transition = "all 0.3s ease-out";
        setTimeout(() => {
          card.remove();
        }, 300);
      });

      if (btnToggleStoic && stoicCalc) {
        btnToggleStoic.addEventListener("click", () => {
          const isHidden = stoicCalc.classList.toggle("hidden");
          if (!isHidden) infoSection.classList.add("hidden");
          btnToggleStoic.textContent = isHidden
            ? "Stoichiometry"
            : "Hide Stoichiometry";
          btnToggleInfo.textContent = "Reaction Insights";
        });
      }

      btnToggleInfo.addEventListener("click", () => {
        const isHidden = infoSection.classList.toggle("hidden");
        if (!isHidden && stoicCalc) stoicCalc.classList.add("hidden");
        btnToggleInfo.textContent = isHidden
          ? "Reaction Insights"
          : "Hide Insights";
        if (btnToggleStoic) btnToggleStoic.textContent = "Stoichiometry";
      });

      // Stoichiometry math logic for this specific card
      if (hasStoic) {
        const participants = card.querySelectorAll(".participant");
        const moleInputs = card.querySelectorAll(".input-moles");
        const gramInputs = card.querySelectorAll(".input-grams");

        function formatVal(num, isMole) {
          if (isNaN(num) || num === null || num === undefined) return "";
          if (num <= 0) return "0";
          if (num < 0.0001) {
            return num
              .toExponential(4)
              .replace(/e\+0/, "e")
              .replace(/e-0/, "e-");
          }
          const d = isMole ? 5 : 3;
          let str = num.toFixed(d);
          if (str.includes(".")) {
            str = str.replace(/0+$/, "").replace(/\.$/, "");
          }
          return str;
        }

        function updateFromSource(sourceIndex, isMoleInput) {
          const inputs = Array.from(moleInputs).concat(Array.from(gramInputs));
          const sourceInp = inputs.find(
            (i) =>
              i.dataset.index === sourceIndex &&
              (isMoleInput
                ? i.classList.contains("input-moles")
                : i.classList.contains("input-grams")),
          );

          if (!sourceInp || sourceInp.value.trim() === "") {
            clearAll();
            return;
          }

          let val = parseFloat(sourceInp.value);
          if (isNaN(val)) {
            clearAll();
            return;
          }

          if (val < 0) {
            val = Math.abs(val);
            sourceInp.value = val;
          }

          const sourceEl = sourceInp.closest(".participant");
          const sourceMW = parseFloat(sourceEl.dataset.mw) || 50.0;
          const sourceCoeff = parseFloat(sourceEl.dataset.coeff) || 1.0;
          const baseMoles = isMoleInput ? val : val / sourceMW;
          const molesPerUnitCoeff = baseMoles / sourceCoeff;

          participants.forEach((p) => {
            const mInp = p.querySelector(".input-moles");
            const gInp = p.querySelector(".input-grams");
            const idx = mInp.dataset.index;

            if (idx === sourceIndex) {
              if (isMoleInput) gInp.value = formatVal(val * sourceMW, false);
              else mInp.value = formatVal(val / sourceMW, true);
            } else {
              const pCoeff = parseFloat(p.dataset.coeff) || 1.0;
              const pMW = parseFloat(p.dataset.mw) || 50.0;
              const pMoles = molesPerUnitCoeff * pCoeff;
              const pGrams = pMoles * pMW;
              mInp.value = formatVal(pMoles, true);
              gInp.value = formatVal(pGrams, false);
            }
          });

          // Beautiful golden glowing active-driver indicators
          participants.forEach((p) => {
            p.style.backgroundColor = "transparent";
            p.style.borderLeft = "none";
            p.style.transition = "all 0.3s ease";
          });
          sourceEl.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          sourceEl.style.borderLeft = "4px solid #ffdfa9";
        }

        moleInputs.forEach((inp) => {
          inp.addEventListener("input", (e) =>
            updateFromSource(e.target.dataset.index, true),
          );
        });

        gramInputs.forEach((inp) => {
          inp.addEventListener("input", (e) =>
            updateFromSource(e.target.dataset.index, false),
          );
        });

        function clearAll() {
          moleInputs.forEach((i) => (i.value = ""));
          gramInputs.forEach((i) => (i.value = ""));
          participants.forEach((p) => {
            p.style.backgroundColor = "transparent";
            p.style.borderLeft = "none";
          });
        }
      }

      outputArea.scrollIntoView({ behavior: "smooth" });
    });

    if (MathJax && MathJax.typesetPromise) {
      await MathJax.typesetPromise([outputArea]);
    }
  });
}
