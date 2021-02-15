// DOM
const components = {
    gender: {
        maleInput: document.getElementById('gender-male'),
        femaleInput: document.getElementById('gender-female')
    },
    parameters: {
        age: document.getElementById('age'),
        height: document.getElementById('height'),
        weight: document.getElementById('weight')
    },
    activity: {
        minimal: document.getElementById('activity-minimal'),
        low: document.getElementById('activity-low'),
        medium: document.getElementById('activity-medium'),
        high: document.getElementById('activity-high'),
        maximal: document.getElementById('activity-maximal')
    },
    calc: {
        submitBtn: document.getElementById('form__submit-btn'),
        resetBtn: document.getElementById('form__reset-btn')
    },
    counter: {
        counterResult: document.querySelector('.counter__result'),
        caloriesNormal: document.querySelector('.calories-normal'),
        caloriesMinimal: document.querySelector('.calories-minimal'),
        caloriesMaximal: document.querySelector('.calories-maximal')
    }
};

// data
const defaults = {
    gender: {
        male: components.gender.maleInput.value,
        female: components.gender.femaleInput.value
    },
    activity: {
        minimal: components.activity.minimal.value,
        low: components.activity.low.value,
        medium: components.activity.medium.value,
        high: components.activity.high.value,
        maximal: components.activity.maximal.value,
    }
};

// state
const state = {
    gender: defaults.gender.male,
    parameters: {
        age: parseInt(components.parameters.age.value),
        height: parseInt(components.parameters.height.value),
        weight: parseInt(components.parameters.weight.value)
    },
    activity: defaults.activity.minimal,
    canCalculate: false,
    canReset: false,
    showCount: false
};

// update actions
const updateActions = () => {
    const canReset = state.parameters.age || state.parameters.height || state.parameters.weight;
    state.canReset = canReset;
    components.calc.resetBtn.disabled = !canReset;

    const canCalculate = state.parameters.age && state.parameters.height && state.parameters.weight;
    state.canCalculate = canCalculate;
    components.calc.submitBtn.disabled = !canCalculate;

    components.counter.counterResult.classList.toggle('counter__result--hidden', !state.showCount);
};

// inits
const initForm = () => {
    form = document.querySelector(".counter__form");
    form.addEventListener('submit', (event) => { 
        event.preventDefault();
    });
};

const initGender = () => {
    components.gender.maleInput.checked = true;
    components.gender.maleInput.onclick = () => {
        if (components.gender.maleInput.checked) {
            state.gender = defaults.gender.male
        }
    };
    components.gender.femaleInput.onclick = () => {
        if (components.gender.femaleInput.checked) {  
            state.gender = defaults.gender.female;
        }
    };
};

const initParameters = () => {
    components.parameters.age.oninput = () => {
        state.parameters.age = parseInt(components.parameters.age.value);
        updateActions();
    };
    components.parameters.height.oninput = () => {
        state.parameters.height = parseInt(components.parameters.height.value);
        updateActions();
    };
    components.parameters.weight.oninput = () => {
        state.parameters.weight = parseInt(components.parameters.weight.value);
        updateActions();
    };;
};

const initActivity = () => {
    components.activity.minimal.checked = true;
    components.activity.minimal.onchange = () => {
        if (components.activity.minimal.checked) {
            state.activity = defaults.activity.minimal;
        }
    };
    components.activity.low.onchange = () => {
        if (components.activity.low.checked) {
            state.activity = defaults.activity.low;
        }
    };
    components.activity.medium.onchange = () => {
        if (components.activity.medium.checked) {
            state.activity = defaults.activity.medium;
        }
    };
    components.activity.high.onchange = () => {
        if (components.activity.high.checked) {
            state.activity = defaults.activity.high;
        }
    };
    components.activity.maximal.onchange = () => {
        if (components.activity.maximal.checked) {
            state.activity = defaults.activity.maximal;
        }
    };
};

const initActions = () => {
    components.calc.submitBtn.onclick = () => {
        const updateCounter = () => {
            const coef = {
                [defaults.activity.minimal]: 1.2,
                [defaults.activity.low]: 1.375,
                [defaults.activity.medium]: 1.55,
                [defaults.activity.high]: 1.725,
                [defaults.activity.maximal]: 1.9
            };

            const tmpWeight = state.parameters.weight * 10;
            const tmpHeight = state.parameters.height * 6.25;
            const tmpAge = state.parameters.age * 5;
            let N = tmpWeight + tmpHeight - tmpAge;

            N += (state.gender === defaults.gender.male) ? 5 : -161;
            N *= coef[state.activity];

            const caloriesNormal = N.toFixed(0);
            const caloriesMinimal = (N - N*0.15).toFixed(0);
            const caloriesMaximal = (N + N*0.15).toFixed(0);

            components.counter.caloriesNormal.innerHTML = caloriesNormal;
            components.counter.caloriesMinimal.innerHTML = caloriesMinimal;
            components.counter.caloriesMaximal.innerHTML = caloriesMaximal;
        };

        if (!state.showCount) {
            state.showCount = true;
            components.counter.counterResult.classList.toggle('counter__result--hidden', false);
        }

        updateCounter();
    };

    components.calc.resetBtn.onclick = () => {
        components.gender.maleInput.checked = true;
        state.gender = defaults.gender.male;

        components.parameters.age.value = '';
        state.parameters.age = NaN;

        components.parameters.height.value = '';
        state.parameters.height = NaN;

        components.parameters.weight.value = '';
        state.parameters.weight = NaN;

        components.activity.minimal.checked = true;
        state.activity = defaults.activity.minimal;

        state.showCount = false;
        updateActions();
    };
};

// main
window.onload = () => {
    initForm();
    initGender();
    initParameters();
    initActivity();
    updateActions();
    initActions();
};