export function UIComponents() {
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
        } else {
            inpReactant2.disabled = false;
            labelReactant2.textContent = 'Reactant Beta';
            inpReactant2.placeholder = 'e.g. O2';
        }
    });

    btnPredict.addEventListener('click', async () => {
        const r1 = inpReactant1.value.trim();
        const r2 = inpReactant2.value.trim();

        if (!r1) {
            errorMsg.textContent = 'Please enter at least one reactant formula (e.g., H2, Mg)';
            errorMsg.classList.remove('hidden');
            return;
        }

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

        await new Promise(res => setTimeout(res, 1500));

        let equation = '';
        switch(currentType) {
            case 'combination': equation = `2${r1} + ${r2 || 'O2'} → 2${r1}${r2 || 'O'}`; break;
            case 'decomposition': equation = `2${r1} → 2${r1.slice(0, -1) || 'X'} + ${r1.slice(-1) || 'Y'}2`; break;
            case 'single_displacement': equation = `${r1} + ${r2 || 'Zn'}Cl2 → ${r1}Cl2 + ${r2 || 'Zn'}`; break;
            case 'double_replacement': equation = `${r1}Cl + Ag${r2 || 'NO3'} → ${r1}${r2 || 'NO3'} + AgCl`; break;
        }

        const data = parseEquation(equation);
        const formatted = equation.split(' ').map(part => {
            if (part === '→' || part === '+') return `<span class="text-terracotta px-2">${part}</span>`;
            return part.split('').map(char => {
                if (/\d/.test(char)) return `<sub class="text-xs opacity-70">${char}</sub>`;
                return char;
            }).join('');
        }).join(' ');

        let reactionInfo = '';
        switch(currentType) {
            case 'combination': reactionInfo = "Synergy of elements: Multiple reactants merge into a singular, more complex substance. This process often releases significant thermal energy as new bonds are established."; break;
            case 'decomposition': reactionInfo = "Fragmentation of matter: A singular compound undergoes structural collapse into simpler constituents, typically requiring an external catalyst or energy source."; break;
            case 'single_displacement': reactionInfo = "Atomic usurpation: A more reactive element displaces a less reactive counterpart from its molecular bond, demonstrating the hierarchy of elemental activity."; break;
            case 'double_replacement': reactionInfo = "Ionic exchange: Two molecular pairs swap partners in a fluid medium, often resulting in the manifestation of an insoluble precipitate or a stable gas."; break;
        }

        outputArea.innerHTML = `
            <div class="text-marble p-8 md:p-12 shadow-2xl border-4 border-terracotta/30 animate-reveal" style="border-radius: 11px; background-color: #4f654d;">
                <div class="space-y-6">
                    <div class="relative">
                        <div class="text-2xl md:text-4xl font-mono p-6 bg-white/5 rounded border overflow-x-auto scrollbar-hide text-center" style="border-color: #d6dcd0;">
                            ${formatted}
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

                    <div id="info-section" class="hidden mt-8 text-left space-y-2 animate-reveal">
                        <h3 class="text-xs uppercase tracking-[0.2em] text-terracotta font-display font-bold">Spectral Insights</h3>
                        <p class="text-marble/80 italic text-sm leading-relaxed">${reactionInfo}</p>
                    </div>

                    <div id="stoic-calc" class="hidden mt-8 text-left space-y-6 animate-reveal">
                         <div class="overflow-x-auto">
                            <table class="w-full text-xs md:text-sm font-display uppercase tracking-wider">
                                <thead>
                                    <tr class="text-marble/40 border-b border-marble/10">
                                        <th class="py-3 text-left">Compound</th>
                                        <th class="py-3 text-center px-1">Coeff</th>
                                        <th class="py-3 text-center px-1">Molar Mass</th>
                                        <th class="py-3 text-center px-2">Moles</th>
                                        <th class="py-3 text-center px-2">Weight (g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-terracotta"><td colspan="5" class="py-4 font-bold border-b border-marble/5">Reagents</td></tr>
                                    ${data.reagents.map((r, i) => `
                                        <tr class="participant border-b border-marble/5" data-coeff="${r.coefficient}" data-mw="${r.mw}" data-role="reagent">
                                            <td class="py-4 font-mono normal-case">${r.formula}</td>
                                            <td class="py-4 text-center text-terracotta">${r.coefficient}</td>
                                            <td class="py-4 text-center text-marble/60">${r.mw.toFixed(2)}</td>
                                            <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles" data-index="r${i}" placeholder="0"></td>
                                            <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams" data-index="r${i}" placeholder="0"></td>
                                        </tr>
                                    `).join('')}
                                    <tr class="text-terracotta"><td colspan="5" class="py-4 font-bold border-b border-marble/5">Products</td></tr>
                                    ${data.products.map((p, i) => `
                                        <tr class="participant border-b border-marble/5" data-coeff="${p.coefficient}" data-mw="${p.mw}" data-role="product">
                                            <td class="py-4 font-mono normal-case">${p.formula}</td>
                                            <td class="py-4 text-center text-terracotta">${p.coefficient}</td>
                                            <td class="py-4 text-center text-marble/60">${p.mw.toFixed(2)}</td>
                                            <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-moles" data-index="p${i}" placeholder="0"></td>
                                            <td class="py-4 px-2"><input type="number" step="any" class="stoichiometry-input input-grams" data-index="p${i}" placeholder="0"></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        outputArea.scrollIntoView({ behavior: 'smooth' });

        const btnToggleStoic = document.getElementById('btn-toggle-stoic');
        const btnToggleInfo = document.getElementById('btn-toggle-info');
        const stoicCalc = document.getElementById('stoic-calc');
        const infoSection = document.getElementById('info-section');

        btnToggleStoic.addEventListener('click', () => {
            const isHidden = stoicCalc.classList.toggle('hidden');
            if (!isHidden) infoSection.classList.add('hidden');
            btnToggleStoic.textContent = isHidden ? 'Forge Stoichiometry' : 'Hide Stoichiometry';
            btnToggleInfo.textContent = 'Reaction Insights';
        });

        btnToggleInfo.addEventListener('click', () => {
            const isHidden = infoSection.classList.toggle('hidden');
            if (!isHidden) stoicCalc.classList.add('hidden');
            btnToggleInfo.textContent = isHidden ? 'Reaction Insights' : 'Hide Insights';
            btnToggleStoic.textContent = 'Forge Stoichiometry';
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