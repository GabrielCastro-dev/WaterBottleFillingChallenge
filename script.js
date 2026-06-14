import PromptSync from 'prompt-sync';

// Variables:
const prompt = PromptSync();
var waterBottles = [];
var availableTaps = [];

// Functions:
function isValidInteger(number){
    return !isNaN(number) && number > 0;
}

function throwErrorMessage(message){
    console.log(`\n\x1b[31m${message}\x1b[0m`);
}

function calculateTotalTime(waterBottles, tapRates){
    let tapsArray = tapRates.map(rate => ({
        time: 0,
        rate: rate
    }));

    waterBottles.forEach(waterBottle => {
        // A list with the period of time accumulated in each tap
        let timesOnly = tapsArray.map(tap => tap.time); 

        // The index of the tap with the lesser amount of time accumulated
        let lesserTimeIndex = timesOnly.indexOf(Math.min(...timesOnly));

        let chosenTap = tapsArray[lesserTimeIndex];
        let timeToFill = (waterBottle / chosenTap.rate) + 2; // 2s is the time to walk to the tap

        chosenTap.time += timeToFill;
    });

    let finalTimes = tapsArray.map(tap => tap.time);
    let totalTime = Math.max(...finalTimes);
    return totalTime;
}

// Getting information from the user:

console.log("\nLet's fill some water bottles!");

// Loop that gets the watter bottles and their capabilites in ml
while (true) {
    console.log(`\n\x1b[34mBottle #${waterBottles.length + 1}:\x1b[0m`);
    let input = prompt("Capacity in ml (or '0' to finish): ").trim();

    if (input === '0' || input === '') {
        if (waterBottles.length === 0) {
            throwErrorMessage("You must enter at least one valid bottle before finishing.");
            continue;
        }
        break; 
    }

    let mililitersInput = parseInt(input, 10);

    //Input validation
    if (!isValidInteger(mililitersInput)) {
        throwErrorMessage("Invalid input! Please enter an integer greater than 0.");
    } else if(mililitersInput > 5000) {
        throwErrorMessage("I don't think anyone would bring a water bottle this big to a festival. Try a number bellow 5000 ml.");
        continue;
    } else {
       waterBottles.push(mililitersInput);
    }
}

console.log("\n\x1b[33mNow we are going to register the taps.");
console.log("The flow rate for each tap should be between 50ml/s and 250ml/s.\x1b[0m");

// Loop for getting the taps and their flow rates
while (true) {
    console.log(`\n\x1b[34mTap #${availableTaps.length + 1}:\x1b[0m`);
    let input = prompt("Flow rate in ml/s (or '0' to finish): ").trim();

    if (input === '0' || input === '') {
        if (availableTaps.length === 0) {
            throwErrorMessage("You must enter at least one valid tap.");
            continue;
        }
        break; 
    }

    let flowRateInput = parseInt(input, 10);

    //Input validation
    if (!isValidInteger(flowRateInput)) {
        throwErrorMessage("Invalid input! The text you provided is not a valid number.");
    } else if(flowRateInput < 50 || flowRateInput > 250) {
        throwErrorMessage("Invalid input! Type a number between 50 and 250.");
        continue;
    } else {
       availableTaps.push(flowRateInput);
    }
}

// Printing the response to the console:
var finalResponse = calculateTotalTime(waterBottles, availableTaps);
console.log(`\n\x1b[32mThe total amount of time to fill all bottles is: ${finalResponse}s\x1b[0m`);