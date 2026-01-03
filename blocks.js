/**
 * SCRATCH PRO - BLOCK DEFINITION KERNEL
 * * INSTRUCTIONS FOR AI ASSISTANTS:
 * 1. To add a new block:
 * - Define the block structure in 'Blockly.Blocks'.
 * - Define the generator logic in 'javascript.javascriptGenerator.forBlock'.
 * - Ensure the generator uses 'await' for any motion, looks, or timing blocks.
 * - Use 'self' to refer to the current sprite and 'state' for global properties.
 * 2. Categories to prioritize: Sensing, Operators, Sound, and Data.
 * 3. Keep the ' zelon' / Scratch-style aesthetics.
 */

// --- MOTION BLOCKS ---
Blockly.Blocks['motion_setx'] = {
    init: function() {
        this.appendValueInput("X").setCheck("Number").appendField("set x to");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4C97FF");
    }
};

Blockly.Blocks['motion_sety'] = {
    init: function() {
        this.appendValueInput("Y").setCheck("Number").appendField("set y to");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4C97FF");
    }
};

// --- LOOKS BLOCKS ---
Blockly.Blocks['looks_hide'] = {
    init: function() {
        this.appendDummyInput().appendField("hide");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#9966FF");
    }
};

Blockly.Blocks['looks_show'] = {
    init: function() {
        this.appendDummyInput().appendField("show");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#9966FF");
    }
};

// --- CONTROL BLOCKS ---
Blockly.Blocks['controls_if_else'] = {
    init: function() {
        this.appendValueInput("IF0").setCheck("Boolean").appendField("if");
        this.appendStatementInput("DO0").appendField("then");
        this.appendStatementInput("ELSE").appendField("else");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FFAB19");
    }
};

// --- GENERATORS ---
const gen = javascript.javascriptGenerator;

// Motion
gen.forBlock['motion_move'] = (b) => `if(!self.isStage) await moveSprite(self, ${gen.valueToCode(b,'STEPS',javascript.Order.ATOMIC)||0});\n`;
gen.forBlock['motion_turn'] = (b) => {
    const deg = gen.valueToCode(b,'DEGREES',javascript.Order.ATOMIC)||0;
    const dir = b.getFieldValue('DIRECTION') === 'RIGHT' ? deg : `-${deg}`;
    return `if(!self.isStage) { self.direction += ${dir}; state.updateUI(); await sleep(30); }\n`;
};
gen.forBlock['motion_goto_xy'] = (b) => `if(!self.isStage) { self.x = ${gen.valueToCode(b,'X',javascript.Order.ATOMIC)} + state.stage.w/2; self.y = state.stage.h/2 - ${gen.valueToCode(b,'Y',javascript.Order.ATOMIC)}; state.updateUI(); await sleep(30); }\n`;
gen.forBlock['motion_setx'] = (b) => `if(!self.isStage) { self.x = ${gen.valueToCode(b,'X',javascript.Order.ATOMIC)} + state.stage.w/2; state.updateUI(); await sleep(30); }\n`;
gen.forBlock['motion_sety'] = (b) => `if(!self.isStage) { self.y = state.stage.h/2 - ${gen.valueToCode(b,'Y',javascript.Order.ATOMIC)}; state.updateUI(); await sleep(30); }\n`;

// Events
gen.forBlock['event_whenflagclicked'] = () => "";
gen.forBlock['event_whenbroadcastreceived'] = () => "";
gen.forBlock['event_broadcast'] = (b) => `await state.broadcast(${gen.valueToCode(b,'MESSAGE',javascript.Order.ATOMIC)});\n`;

// Looks
gen.forBlock['looks_say'] = (b) => `logToConsole("[" + self.name + "] " + ${gen.valueToCode(b,'MESSAGE',javascript.Order.ATOMIC)}); await sleep(100);\n`;
gen.forBlock['looks_hide'] = () => `if(!self.isStage && self.dom) { self.dom.style.opacity = '0'; await sleep(30); }\n`;
gen.forBlock['looks_show'] = () => `if(!self.isStage && self.dom) { self.dom.style.opacity = '1'; await sleep(30); }\n`;

// Control
gen.forBlock['control_wait'] = (b) => `await sleep(${gen.valueToCode(b,'DURATION',javascript.Order.ATOMIC)*1000});\n`;
gen.forBlock['control_forever'] = (b) => `while(true) {\n${gen.statementToCode(b,'DO')} await sleep(10);\n}\n`;
gen.forBlock['controls_repeat_ext'] = (block) => {
    const repeats = gen.valueToCode(block, 'TIMES', javascript.Order.ASSIGNMENT) || '0';
    return `for (let i = 0; i < ${repeats}; i++) {\n${gen.statementToCode(block, 'DO')}  await sleep(10);\n}\n`;
};
gen.forBlock['controls_if'] = (block) => `if (${gen.valueToCode(block, 'IF0', javascript.Order.NONE) || 'false'}) {\n${gen.statementToCode(block, 'DO0')}}\n`;
gen.forBlock['controls_if_else'] = (block) => `if (${gen.valueToCode(block, 'IF0', javascript.Order.NONE) || 'false'}) {\n${gen.statementToCode(block, 'DO0')}} else {\n${gen.statementToCode(block, 'ELSE')}}\n`;
