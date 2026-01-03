/**
 * AI INSTRUCTIONS FOR ADDING BLOCKS:
 * 1. To add a new block, locate the correct "category" in the BLOCK_DATABASE.
 * 2. Add a new object to the "blocks" array.
 * 3. Format: { id: "unique_id", label: "Display Text" }
 * 4. To add a NEW CATEGORY, create a new object in "categories" with:
 * name: "Category Name", color: "Hex Color", blocks: []
 * 5. DO NOT change the structure of the existing categories.
 * 6. NO LIMIT: You can add 1000+ blocks here and the UI will automatically update.
 */

const BLOCK_DATABASE = {
    categories: [
        {
            name: "Motion",
            color: "#4C97FF",
            blocks: [
                { id: "move_steps", label: "move 10 steps" },
                { id: "turn_right", label: "turn clockwise 15 degrees" },
                { id: "turn_left", label: "turn counter-clockwise 15 degrees" },
                { id: "goto_random", label: "go to random position" }
            ]
        },
        {
            name: "Looks",
            color: "#9966FF",
            blocks: [
                { id: "say_hello", label: "say Hello! for 2 seconds" },
                { id: "think_hmm", label: "think Hmm... for 2 seconds" },
                { id: "switch_costume", label: "switch costume to costume1" },
                { id: "change_size", label: "change size by 10" }
            ]
        },
        {
            name: "Sound",
            color: "#CF63CF",
            blocks: [
                { id: "play_meow", label: "play sound Meow until done" },
                { id: "stop_sounds", label: "stop all sounds" }
            ]
        },
        {
            name: "Control",
            color: "#FFAB19",
            blocks: [
                { id: "wait_1", label: "wait 1 seconds" },
                { id: "repeat_10", label: "repeat 10" },
                { id: "forever", label: "forever" }
            ]
        }
        // AI: ADD NEW CATEGORIES BELOW THIS LINE
    ]
};
