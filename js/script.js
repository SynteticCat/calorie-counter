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
        resetBtn: document.getElementById('form__reset-btn'),
    }
};

// state
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
    showInfo: false
};

const updateActions = () => {
    const canReset = state.parameters.age || state.parameters.height || state.parameters.weight;
    state.canReset = canReset;
    components.calc.resetBtn.disabled = !canReset;

    const canCalculate = state.parameters.age && state.parameters.height && state.parameters.weight;
    state.canCalculate = canCalculate;
    components.calc.submitBtn.disabled = !canCalculate;
};

// inits
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
        alert('hi');
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
        
        updateActions();
    };
};

// main
window.onload = () => {
    initGender();
    initParameters();
    initActivity();
    updateActions();
    initActions();
};