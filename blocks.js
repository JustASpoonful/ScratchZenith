const gen = javascript.javascriptGenerator;

// --- 1. THE TOOLBOX (With Shadow Blocks for Inputs) ---
const fullToolbox = {
    "kind": "categoryToolbox",
    "contents": [
        { "kind": "category", "name": "Motion", "colour": "#4C97FF", "contents": [
            { "kind": "block", "type": "motion_move", "inputs": { "STEPS": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } } } },
            { "kind": "block", "type": "motion_turn_right", "inputs": { "DEG": { "shadow": { "type": "math_number", "fields": { "NUM": 15 } } } } },
            { "kind": "block", "type": "motion_goto_xy", "inputs": { 
                "X": { "shadow": { "type": "math_number", "fields": { "NUM": 0 } } },
                "Y": { "shadow": { "type": "math_number", "fields": { "NUM": 0 } } }
            }}
        ]},
        { "kind": "category", "name": "Control", "colour": "#FFAB19", "contents": [
            { "kind": "block", "type": "control_repeat", "inputs": { "TIMES": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } } } },
            { "kind": "block", "type": "control_forever" },
            { "kind": "block", "type": "controls_if" }
        ]},
        { "kind": "category", "name": "Sensing", "colour": "#4CBFE6", "contents": [
            { "kind": "block", "type": "sensing_mousex" },
            { "kind": "block", "type": "sensing_mousey" },
            { "kind": "block", "type": "sensing_distanceto", "fields": { "OBJ": "MOUSE" } }
        ]},
        { "kind": "category", "name": "Operators", "colour": "#40BF4A", "contents": [
            { "kind": "block", "type": "math_arithmetic", "inputs": { 
                "A": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } },
                "B": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } }
            }},
            { "kind": "block", "type": "logic_compare" },
            { "kind": "block", "type": "operator_random", "inputs": { 
                "FROM": { "shadow": { "type": "math_number", "fields": { "NUM": 1 } } },
                "TO": { "shadow": { "type": "math_number", "fields": { "NUM": 10 } } }
            }}
        ]}
    ]
};

// --- 2. BLOCK DEFINITIONS ---
Blockly.defineBlocksWithJsonArray([
    // Motion
    { "type": "motion_move", "message0": "move %1 steps", "args0": [{ "type": "input_value", "name": "STEPS", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    { "type": "motion_turn_right", "message0": "turn ↻ %1 degrees", "args0": [{ "type": "input_value", "name": "DEG", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    { "type": "motion_goto_xy", "message0": "go to x: %1 y: %2", "args0": [{ "type": "input_value", "name": "X", "check": "Number" }, { "type": "input_value", "name": "Y", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    
    // Control
    { "type": "control_repeat", "message0": "repeat %1", "args0": [{ "type": "input_value", "name": "TIMES", "check": "Number" }], "message1": "%1", "args1": [{ "type": "input_statement", "name": "DO" }], "previousStatement": null, "nextStatement": null, "colour": "#FFAB19" },
    { "type": "control_forever", "message0": "forever", "message1": "%1", "args1": [{ "type": "input_statement", "name": "DO" }], "previousStatement": null, "colour": "#FFAB19" },

    // Sensing
    { "type": "sensing_mousex", "message0": "mouse x", "output": "Number", "colour": "#4CBFE6" },
    { "type": "sensing_mousey", "message0": "mouse y", "output": "Number", "colour": "#4CBFE6" },
    { "type": "sensing_distanceto", "message0": "distance to %1", "args0": [{ "type": "field_dropdown", "name": "OBJ", "options": [["mouse-pointer", "MOUSE"]] }], "output": "Number", "colour": "#4CBFE6" },

    // Operators
    { "type": "operator_random", "message0": "pick random %1 to %2", "args0": [{ "type": "input_value", "name": "FROM" }, { "type": "input_value", "name": "TO" }], "output": "Number", "colour": "#40BF4A" }
]);

// --- 3. GENERATORS ---
gen.forBlock['motion_move'] = b => {
    const s = gen.valueToCode(b, 'STEPS', javascript.Order.ATOMIC) || 0;
    return `const r = (self.dir-90)*(Math.PI/180); self.x += Math.cos(r)*${s}; self.y -= Math.sin(r)*${s}; state.updateUI(); await sleep(20);\n`;
};

gen.forBlock['motion_turn_right'] = b => {
    const d = gen.valueToCode(b, 'DEG', javascript.Order.ATOMIC) || 0;
    return `self.dir += ${d}; state.updateUI(); await sleep(20);\n`;
};

gen.forBlock['motion_goto_xy'] = b => {
    const x = gen.valueToCode(b, 'X', javascript.Order.ATOMIC) || 0;
    const y = gen.valueToCode(b, 'Y', javascript.Order.ATOMIC) || 0;
    return `self.x = ${x}; self.y = ${y}; state.updateUI(); await sleep(20);\n`;
};

gen.forBlock['control_repeat'] = b => {
    const t = gen.valueToCode(b, 'TIMES', javascript.Order.ATOMIC) || 0;
    return `for(let i=0; i<${t}; i++) {\n${gen.statementToCode(b, 'DO')}\nawait sleep(1);\n}\n`;
};

gen.forBlock['control_forever'] = b => `while(true) {\n${gen.statementToCode(b, 'DO')}\nawait sleep(10);\n}\n`;

gen.forBlock['sensing_mousex'] = () => [`state.mouse.x`, javascript.Order.ATOMIC];
gen.forBlock['sensing_mousey'] = () => [`state.mouse.y`, javascript.Order.ATOMIC];
gen.forBlock['sensing_distanceto'] = () => [`Math.sqrt((state.mouse.x-self.x)**2 + (state.mouse.y-self.y)**2)`, javascript.Order.ATOMIC];

gen.forBlock['operator_random'] = b => {
    const f = gen.valueToCode(b, 'FROM', javascript.Order.ATOMIC) || 0;
    const t = gen.valueToCode(b, 'TO', javascript.Order.ATOMIC) || 0;
    return [`Math.floor(Math.random() * (${t} - ${f} + 1)) + ${f}`, javascript.Order.ATOMIC];
};
