
//   // About to spit out hella code for localStorage sorry Quinn :T
//   // Create a function to save to local storage.
//   // The percentage in the below parameters would come from whatever algorithm we use to determine that.

//   // percentage = numberCorrect/totalCorrect * 100

//   const saveProgress = (deckId, percentage) => {
//     // I learned that you need to set .getItem at the beginning of your code or else every time you refresh
//     // the page, it will return an empty array.
//     // We use JSON.parse in order to return an object that has been stringified.
//     // All in all, the below line is to retrieve any existing progress from user's local storage.
//     // Also assuming that userProgress is a pre-existing key-value pair within the local storage.

//     const currentProgress = JSON.parse(localStorage.getItem('userProgress')) || {}

//     // Once we have retrieved existing progress (or an empty key-value pair!), we can update progress with the
//     // passed in percentage parameter and deckId that has been chosen.

//     currentProgress[deckId] = percentage

//     // Super pumped that we established retrieving a key-value pair and updating the pair.
//     // The next step is to use .setItem in order to save to the local storage.
//     // The first parameter is the name of the object we are storing the data, the second parameter
//     // is the stringified object that will be associated within userProgress.

//     localStorage.setItem('userProgress', JSON.stringify(currentProgress))
//   }

//   // userProgress object --> currentProgress object which has key value pairs of deckId and percentages