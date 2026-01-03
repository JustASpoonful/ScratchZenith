/** * SCRATCH PRO - BLOCK LIBRARY
 * Use this file to add new categories and blocks.
 */

const gen = javascript.javascriptGenerator;

// 1. TOOLBOX DEFINITION
const fullToolbox = {
    "kind": "categoryToolbox",
    "contents": [
        { "kind": "category", "name": "Events", "colour": "#FFBF00", "contents": [
            { "kind": "block", "type": "event_whenflagclicked" },
            { "kind": "block", "type": "event_whenbroadcastreceived" },
            { "kind": "block", "type": "event_broadcast" }
        ]},
        { "kind": "category", "name": "Motion", "colour": "#4C97FF", "contents": [
            { "kind": "block", "type": "motion_move" },
            { "kind": "block", "type": "motion_turn_right" },
            { "kind": "block", "type": "motion_turn_left" },
            { "kind": "block", "type": "motion_goto_xy" }
        ]},
        { "kind": "category", "name": "Looks", "colour": "#9966FF", "contents": [
            { "kind": "block", "type": "looks_say" },
            { "kind": "block", "type": "looks_sayforsecs" }
        ]},
        { "kind": "category", "name": "Control", "colour": "#FFAB19", "contents": [
            { "kind": "block", "type": "control_wait" },
            { "kind": "block", "type": "controls_repeat_ext" },
            { "kind": "block", "type": "control_forever" },
            { "kind": "block", "type": "controls_if" }
        ]},
        { "kind": "category", "name": "Variables", "colour": "#FF8C1A", "custom": "VARIABLE" }
    ]
};

// 2. BLOCK DEFINITIONS (JSON)
Blockly.defineBlocksWithJsonArray([
    // EVENTS
    { "type": "event_whenflagclicked", "message0": "when %1 clicked", "args0": [{ "type": "field_image", "src": "https://scratch.mit.edu/static/assets/40432658145e7f1e63a129d5926ec25d.svg", "width": 20, "height": 20 }], "nextStatement": null, "colour": "#FFBF00", "extensions": ["append_hat"] },
    { "type": "event_whenbroadcastreceived", "message0": "when I receive %1", "args0": [{ "type": "field_input", "name": "MESSAGE", "text": "message1" }], "nextStatement": null, "colour": "#FFBF00" },
    { "type": "event_broadcast", "message0": "broadcast %1", "args0": [{ "type": "input_value", "name": "MESSAGE", "check": "String" }], "previousStatement": null, "nextStatement": null, "colour": "#FFBF00" },
    
    // MOTION
    { "type": "motion_move", "message0": "move %1 steps", "args0": [{ "type": "input_value", "name": "STEPS", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    { "type": "motion_turn_right", "message0": "turn ↻ %1 degrees", "args0": [{ "type": "input_value", "name": "DEGREES", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    { "type": "motion_turn_left", "message0": "turn ↺ %1 degrees", "args0": [{ "type": "input_value", "name": "DEGREES", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    { "type": "motion_goto_xy", "message0": "go to x: %1 y: %2", "args0": [{ "type": "input_value", "name": "X", "check": "Number" }, { "type": "input_value", "name": "Y", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#4C97FF" },
    
    // LOOKS
    { "type": "looks_say", "message0": "say %1", "args0": [{ "type": "input_value", "name": "MESSAGE" }], "previousStatement": null, "nextStatement": null, "colour": "#9966FF" },
    { "type": "looks_sayforsecs", "message0": "say %1 for %2 seconds", "args0": [{ "type": "input_value", "name": "MESSAGE" }, { "type": "input_value", "name": "SECS", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#9966FF" },
    
    // CONTROL
    { "type": "control_wait", "message0": "wait %1 seconds", "args0": [{ "type": "input_value", "name": "DURATION", "check": "Number" }], "previousStatement": null, "nextStatement": null, "colour": "#FFAB19" },
    { "type": "control_forever", "message0": "forever", "message1": "%1", "args1": [{ "type": "input_statement", "name": "DO" }], "previousStatement": null, "colour": "#FFAB19" }
]);

// 3. CODE GENERATORS
gen.forBlock['event_whenflagclicked'] = () => "";
gen.forBlock['event_whenbroadcastreceived'] = () => "";
gen.forBlock['event_broadcast'] = (b) => `await state.broadcast(${gen.valueToCode(b,'MESSAGE',javascript.Order.ATOMIC)});\n`;

gen.forBlock['motion_move'] = (b) => `if(!self.isStage) await moveSprite(self, ${gen.valueToCode(b,'STEPS',javascript.Order.ATOMIC)||0});\n`;
gen.forBlock['motion_turn_right'] = (b) => `if(!self.isStage) { self.direction += ${gen.valueToCode(b,'DEGREES',javascript.Order.ATOMIC)||0}; state.updateUI(); await sleep(30); }\n`;
gen.forBlock['motion_turn_left'] = (b) => `if(!self.isStage) { self.direction -= ${gen.valueToCode(b,'DEGREES',javascript.Order.ATOMIC)||0}; state.updateUI(); await sleep(30); }\n`;
gen.forBlock['motion_goto_xy'] = (b) => `if(!self.isStage) { self.x = (${gen.valueToCode(b,'X',javascript.Order.ATOMIC)}||0) + state.stage.w/2; self.y = state.stage.h/2 - (${gen.valueToCode(b,'Y',javascript.Order.ATOMIC)}||0); state.updateUI(); await sleep(30); }\n`;

gen.forBlock['looks_say'] = (b) => `logToConsole("[" + self.name + "] " + ${gen.valueToCode(b,'MESSAGE',javascript.Order.ATOMIC)}); await sleep(100);\n`;
gen.forBlock['looks_sayforsecs'] = (b) => `logToConsole("[" + self.name + "] " + ${gen.valueToCode(b,'MESSAGE',javascript.Order.ATOMIC)}); await sleep(${gen.valueToCode(b,'SECS',javascript.Order.ATOMIC)*1000});\n`;

gen.forBlock['control_wait'] = (b) => `await sleep(${gen.valueToCode(b,'DURATION',javascript.Order.ATOMIC)*1000});\n`;
gen.forBlock['control_forever'] = (b) => `while(true) {\n${gen.statementToCode(b,'DO')} await sleep(10);\n}\n`;

// Custom hat styling
Blockly.Extensions.register('append_hat', function() { this.hat = 'cap'; });
