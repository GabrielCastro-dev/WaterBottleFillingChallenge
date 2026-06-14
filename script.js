import PromptSync from 'prompt-sync';

// Variables:
const prompt = PromptSync();
var waterBottles = [];
var availableTaps = 0;
var tapRates = [];

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
            console.log("\x1b[31mYou must enter at least one valid bottle before finishing.\x1b[0m");
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

// Loop for getting the number of available taps
while (true) {
    let inputTaps = prompt("\nHow many taps are available at the festival? (Ex: 3): ").trim();
    availableTaps = parseInt(inputTaps, 10);

    //Input validation
    if (!isValidInteger(availableTaps)) {
        throwErrorMessage("Invalid number! type a valid integer greater than 0.");
    } else if(availableTaps > 200) {
        throwErrorMessage(`${availableTaps} is a really unbelievable number of taps. Try something bellow 50.`);
        continue;
    } else {
        break;
    }
}

// Setting a random flow rate for each tap
console.log("\n\x1b[34mRandomly generated flow rates of the taps:\x1b[0m");
for (let i = 0; i < availableTaps; i++) {
    let minRate = 5; 
    let maxRate = 25; 
    let randomRate = (Math.floor(Math.random() * (maxRate - minRate + 1)) + minRate) * 10;
    
    tapRates.push(randomRate);
    console.log(`Tap #${i + 1}: ${randomRate}ml/s`);
}

// Printing the response to the console:
var finalResponse = calculateTotalTime(waterBottles, tapRates);
console.log(`\n\x1b[32mThe total amount of time to fill all bottles is: ${finalResponse}s\x1b[0m`);