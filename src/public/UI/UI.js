export async function UIComponents(MathJax, buttonActivaton) {
  const welcomeScreen = document.getElementById('welcome-screen');
  const toolScreen = document.getElementById('tool-screen');
  const btnEnter = document.getElementById('btn-enter');
  const btnBack = document.getElementById('btn-back');
  const btnPredict = document.getElementById('btn-predict');
  const typeSelector = document.getElementById('type-selector');
  const inpReactant1 = document.getElementById('inp-reactant-1');
  const inpReactant2 = document.getElementById('inp-reactant-2');
  const labelReactant2 = document.getElementById('label-reactant-2');
  const errorMsg = document.getElementById('error-msg');
  const outputArea = document.getElementById('output-area');

  let currentType = 'combination';

  const atomicWeights = {
    'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180,
    'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078,
    'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38,
    'Ag': 107.87, 'I': 126.90, 'Ba': 137.33, 'Pt': 195.08, 'Au': 196.97, 'Br': 79.904, 'Pb': 207.2
  };

  function calculateMolarMass(formula) {
    if (!formula) return 0;
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let mass = 0;
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const count = parseInt(match[2] || 1);
      if (atomicWeights[element]) {
        mass += atomicWeights[element] * count;
      }
    }
    return mass;
  }

  function parseEquation(equation) {
    const [left, right] = equation.split(' → ');
    const parseSide = (side) => {
      return side.split(' + ').map(part => {
        const match = part.match(/^(\d*)(.*)$/);
        return {
          coefficient: parseInt(match[1] || 1),
          formula: match[2],
          mw: calculateMolarMass(match[2])
        };
      });
    };
    return {
        reagents: parseSide(left),
        products: parseSide(right)
    };
  }

  btnEnter.addEventListener('click', () => {
    welcomeScreen.classList.add('opacity-0', '-translate-y-10');
    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
      toolScreen.classList.remove('hidden');
      setTimeout(() => {
        toolScreen.classList.remove('opacity-0', 'translate-y-10');
      }, 50);
    }, 700);
  });

  btnBack.addEventListener('click', () => {
    toolScreen.classList.add('opacity-0', 'translate-y-10');
    setTimeout(() => {
      toolScreen.classList.add('hidden');
      welcomeScreen.classList.remove('hidden');
      setTimeout(() => {
        welcomeScreen.classList.remove('opacity-0', '-translate-y-10');
      }, 50);
    }, 700);
  });

  let howMuch = 2;

  typeSelector.addEventListener('click', (e) => {
    const target = e.target.closest('.type-btn');
    if (!target) return;

    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.classList.add('bg-white/50', 'border-olive/20', 'text-olive', 'hover:bg-white/80');
    });

    target.classList.add('active');
    target.classList.remove('bg-white/50', 'border-olive/20', 'text-olive', 'hover:bg-white/80');

    currentType = target.getAttribute('data-type');

    if (currentType === 'decomposition') {
      inpReactant2.disabled = true;
      inpReactant2.value = '';
      labelReactant2.textContent = 'Optional Context';
      inpReactant2.placeholder = 'N/A';
      howMuch = 1;
    } else {
      inpReactant2.disabled = false;
      labelReactant2.textContent = 'Reactant Beta';
      inpReactant2.placeholder = 'e.g. O2';
      howMuch = 2;
    }
  });

  btnPredict.addEventListener('click', async () => {
    const r1 = inpReactant1.value.trim();
    const r2 = inpReactant2.value.trim();

    if (howMuch === 1) {
      if (!r1) {
        errorMsg.textContent = 'Please enter at least one reactant formula (e.g., H, MgO)';
        errorMsg.classList.remove('hidden');
        return;
      };
    } else {
      if (!r1 || !r2) {
        errorMsg.textContent = 'Please enter two reactant formula (e.g., H, MgO)';
        errorMsg.classList.remove('hidden');
        return;
      };
    };

    errorMsg.classList.add('hidden');
    
    outputArea.innerHTML = `
      <div class="flex flex-col items-center justify-center p-12 space-y-6">
        <div class="relative">
          <div class="w-16 h-16 border-t-2 border-b-2 border-olive rounded-full animate-spin"></div>
        </div>
        <p class="font-display text-olive tracking-widest uppercase text-sm">Transmuting...</p>
      </div>
    `;
    outputArea.scrollIntoView({ behavior: 'smooth' });

    console.log(r1, r2);

    const reactionData = await buttonActivaton(currentType, r1, r2);
    console.log(reactionData);

    let equationsArray = [];
    let dataArray = [];

    
    if (currentType === 'combination') {
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
        
      } else {
        const itsAllData = reactionData[0];

        for (let i = 1;i < reactionData.length;i++) {
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
        };
      };

    } else if (currentType === 'decomposition') {
      reactionData.forEach(anEquation => {
        const compoundsData = Object.entries(anEquation[3]);

        let totalresult = '';
        compoundsData.forEach(aCompound => {
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
      });

    } else if (currentType === 'single_displacement') {

      const productsData = reactionData.products;
      const reactantsData = reactionData.reactants;

      let totalproducts = '';
      for (let i = 1; i < productsData.length;i++) {
        const aProduct = productsData[i];

        totalproducts += `
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            ${aProduct.formula} : <br>
            name : ${aProduct.name} <br>
            cid : ${aProduct.cid} <br>
          </div>
        `;
      };

      let totalreactants = '';
      for (let i = 0; i < reactantsData.length;i++) {
        const aReactant = reactantsData[i];

        totalreactants += `
          <hr style="border-color: transparent;margin-top: 5px; margin-bottom: 5px; ">
          <div class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            ${aReactant.formula} : <br>
            name : ${aReactant.name} <br>
            cid : ${aReactant.cid} <br>
          </div>
        `;
      };

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
    let allHTML = ''
    equationsArray.forEach((anEquation, i) => {
      const thatEquationData = dataArray[i];

      allHTML += `
        <div class="text-marble p-8 md:p-12 shadow-2xl border-4 border-terracotta/30 animate-reveal" style="border-radius: 11px; background-color: #4f654d; margin-bottom: 10px;">
          <div class="space-y-6 main-card">
            <div class="relative">
              <div class="text-2xl md:text-4xl font-mono p-6 bg-white/5 rounded border overflow-x-auto scrollbar-hide text-center" style="border-color: #d6dcd0;">
                ${anEquation}
              </div>
            </div>
              
            <div class="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-marble/10">
              <button id="btn-toggle-info" class="secondary-action-btn btn-toggle-info" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
                Reaction Insights
              </button>
              <button id="btn-toggle-stoic" class="secondary-action-btn btn-toggle-stoic" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
                Stoichiometry
              </button>
            </div>

            <div id="info-section" class="hidden mt-8 text-left space-y-3 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5 info-section">
              <h3 class="text-xs uppercase tracking-[0.2em] text-[#ffdfa9] font-sans font-bold">Reaction Info</h3>
              <p class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
                ${thatEquationData}
              </p>
            </div>

            <div id="stoic-calc" class="hidden mt-8 text-left space-y-6 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5 font-sans stoic-calc">
              <div class="overflow-x-auto">
                <table class="w-full text-xs md:text-sm font-sans tracking-normal">
                  <thead>
                    <tr class="text-marble/70 border-b border-marble/10 font-semibold">
                      <th class="py-3 text-left font-semibold">Compound</th>
                      <th class="py-3 text-center px-1 font-semibold">Coeff</th>
                      <th class="py-3 text-center px-1 font-semibold">Molar Mass</th>
                      <th class="py-3 text-center px-2 font-semibold">Moles</th>
                      <th class="py-3 text-center px-2 font-semibold">mass</th>
                    </tr>
                  </thead>
                    
                  <tbody>
                    <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">reactants</td></tr>
                    ${/*data.reagents.map((r, i) => `
                      <tr class="participant border-b border-marble/5 font-sans" data-coeff="${r.coefficient}" data-mw="${r.mw}" data-role="reagent">
                        <td class="py-4 font-mono normal-case font-bold text-white">${r.formula}</td>
                        <td class="py-4 text-center font-bold text-[#ffdfa9]">${r.coefficient}</td>
                        <td class="py-4 text-center text-marble/80">${r.mw.toFixed(2)}</td>
                        <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="r${i}" placeholder="0"></td>
                        <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="r${i}" placeholder="0"></td>
                      </tr>
                    `).join('')*/1}
                    <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">Products</td></tr>
                    ${/*data.products.map((p, i) => `
                      <tr class="participant border-b border-marble/5 font-sans" data-coeff="${p.coefficient}" data-mw="${p.mw}" data-role="product">
                        <td class="py-4 font-mono normal-case font-bold text-white">${p.formula}</td>
                        <td class="py-4 text-center font-bold text-[#ffdfa9]">${p.coefficient}</td>
                        <td class="py-4 text-center text-marble/80">${p.mw.toFixed(2)}</td>
                        <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="p${i}" placeholder="0"></td>
                        <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="p${i}" placeholder="0"></td>
                      </tr>
                    `).join('')*/1}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    outputArea.innerHTML = allHTML;
    let reactionInfo = '';
    

   
    outputArea.scrollIntoView({ behavior: 'smooth' });

    await MathJax.typesetPromise([outputArea]);

    const btnsToggleStoic = document.querySelectorAll('.btn-toggle-stoic');
    const btnsToggleInfo = document.querySelectorAll('.btn-toggle-info');

    btnsToggleStoic.forEach( (abutton) => {
      abutton.addEventListener('click', (event) => {
        const parentCard = event.currentTarget.closest('.main-card');

        const infoSection = parentCard.querySelector('.info-section');
        const stoicCalc = parentCard.querySelector('.stoic-calc');
        const infoInBtn = parentCard.querySelector('.btn-toggle-info');

        const isHidden = stoicCalc.classList.toggle('hidden');
        if (!isHidden) infoSection.classList.add('hidden');

        abutton.textContent = isHidden ? 'Stoichiometry' : 'Hide Stoichiometry';
        infoInBtn.textContent = 'Reaction Insights';
      });
    });

    btnsToggleInfo.forEach( (abutton) => {
      abutton.addEventListener('click', () => {
        const parentCard = event.currentTarget.closest('.main-card');

        const infoSection = parentCard.querySelector('.info-section');
        const stoicCalc = parentCard.querySelector('.stoic-calc');
        const stoicInBtn = parentCard.querySelector('.btn-toggle-stoic');

        const isHidden = infoSection.classList.toggle('hidden');
        if (!isHidden) stoicCalc.classList.add('hidden');
        abutton.textContent = isHidden ? 'Reaction Insights' : 'Hide Insights';
        stoicInBtn.textContent = 'Stoichiometry';
      });
    });

    // Stoichiometry logic
    const participants = document.querySelectorAll('.participant');
    const moleInputs = document.querySelectorAll('.input-moles');
    const gramInputs = document.querySelectorAll('.input-grams');

    function updateFromSource(sourceIndex, isMoleInput) {
      const inputs = Array.from(moleInputs).concat(Array.from(gramInputs));
      const sourceInp = inputs.find(i => i.dataset.index === sourceIndex && (isMoleInput ? i.classList.contains('input-moles') : i.classList.contains('input-grams')));
      const val = parseFloat(sourceInp.value);
      
      if (isNaN(val)) return;

      const sourceEl = sourceInp.closest('.participant');
      const sourceMW = parseFloat(sourceEl.dataset.mw);
      const sourceCoeff = parseFloat(sourceEl.dataset.coeff);
      const baseMoles = isMoleInput ? val : val / sourceMW;
      const molesPerUnitCoeff = baseMoles / sourceCoeff;

      participants.forEach(p => {
        const mInp = p.querySelector('.input-moles');
        const gInp = p.querySelector('.input-grams');
        const idx = mInp.dataset.index;

        if (idx === sourceIndex) {
          if (isMoleInput) gInp.value = (val * sourceMW).toFixed(2).replace(/\.?0+$/, "");
          else mInp.value = (val / sourceMW).toFixed(4).replace(/\.?0+$/, "");
        } else {
          const pCoeff = parseFloat(p.dataset.coeff);
          const pMW = parseFloat(p.dataset.mw);
          const pMoles = molesPerUnitCoeff * pCoeff;
          const pGrams = pMoles * pMW;
          mInp.value = pMoles.toFixed(4).replace(/\.?0+$/, "");
          gInp.value = pGrams.toFixed(2).replace(/\.?0+$/, "");
        }
      });

      // Highlight limiting reagent (in this simple mode, the source reagent IS the limiting assumption)
      participants.forEach(p => p.classList.remove('bg-terracotta/10'));
      if (sourceEl.dataset.role === 'reagent') {
        sourceEl.classList.add('bg-terracotta/10');
      }
    }

    moleInputs.forEach(inp => {
      inp.addEventListener('input', (e) => updateFromSource(e.target.dataset.index, true));
    });

    gramInputs.forEach(inp => {
      inp.addEventListener('input', (e) => updateFromSource(e.target.dataset.index, false));
    });

    function clearAll() {
      moleInputs.forEach(i => i.value = "");
      gramInputs.forEach(i => i.value = "");
      participants.forEach(p => p.classList.remove('bg-terracotta/10'));
    }
  });
};

/* 
 outputArea.innerHTML = `
    <div class="text-marble p-8 md:p-12 shadow-2xl border-4 border-terracotta/30 animate-reveal" style="border-radius: 11px; background-color: #4f654d;">
      <div class="space-y-6">
        <div class="relative">
          <div class="text-2xl md:text-4xl font-mono p-6 bg-white/5 rounded border overflow-x-auto scrollbar-hide text-center" style="border-color: #d6dcd0;">
            \\( \\ce{2Na_(_s_) + H_2_(_g_) \\longrightarrow 2NaH_} \\)
          </div>
        </div>
          
        <div class="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-marble/10">
          <button id="btn-toggle-info" class="secondary-action-btn" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
            Reaction Insights
          </button>
          <button id="btn-toggle-stoic" class="secondary-action-btn" style="background-color: #8c4533; border-radius: 5px; padding: 10px 20px;">
            Forge Stoichiometry
          </button>
        </div>

        <div id="info-section" class="hidden mt-8 text-left space-y-3 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5">
          <h3 class="text-xs uppercase tracking-[0.2em] text-[#ffdfa9] font-sans font-bold">Reaction Info</h3>
          <p class="text-[#f5f1e6] font-sans text-sm md:text-[15px] leading-relaxed font-normal">
            ${reactionInfo}
          </p>
        </div>

        <div id="stoic-calc" class="hidden mt-8 text-left space-y-6 animate-reveal p-5 rounded-lg bg-black/15 border border-white/5 font-sans">
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
                <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">reactants</td></tr>
                ${/*data.reagents.map((r, i) => `
                  <tr class="participant border-b border-marble/5 font-sans" data-coeff="${r.coefficient}" data-mw="${r.mw}" data-role="reagent">
                    <td class="py-4 font-mono normal-case font-bold text-white">${r.formula}</td>
                    <td class="py-4 text-center font-bold text-[#ffdfa9]">${r.coefficient}</td>
                    <td class="py-4 text-center text-marble/80">${r.mw.toFixed(2)}</td>
                    <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="r${i}" placeholder="0"></td>
                    <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="r${i}" placeholder="0"></td>
                  </tr>
                `).join('')*/1 /* }
                <tr class="text-[#ffdfa9]"><td colspan="5" class="py-4 font-bold border-b border-marble/5 text-xs md:text-sm uppercase tracking-wider">Products</td></tr>
                ${/*data.products.map((p, i) => `
                  <tr class="participant border-b border-marble/5 font-sans" data-coeff="${p.coefficient}" data-mw="${p.mw}" data-role="product">
                    <td class="py-4 font-mono normal-case font-bold text-white">${p.formula}</td>
                    <td class="py-4 text-center font-bold text-[#ffdfa9]">${p.coefficient}</td>
                    <td class="py-4 text-center text-marble/80">${p.mw.toFixed(2)}</td>
                    <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles font-sans" data-index="p${i}" placeholder="0"></td>
                    <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams font-sans" data-index="p${i}" placeholder="0"></td>
                  </tr>
                `).join('')*//*1}  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;


*/