const closedRecyclingBin = document.querySelector('#closed-recycling-bin');
const openRecyclingBin = document.querySelector('#open-recycling-bin');
const closedGarbageBin = document.querySelector('#closed-garbage-bin');
const openGarbageBin = document.querySelector('#open-garbage-bin');
const closedGreenBin = document.querySelector('#closed-green-bin');
const openGreenBin = document.querySelector('#open-green-bin');


export function openTheBins(){
    closedRecyclingBin.classList.add('disappear');
    closedGarbageBin.classList.add('disappear');
    closedGreenBin.classList.add('disappear');

    openRecyclingBin.classList.remove('disappear');
    openGarbageBin.classList.remove('disappear');
    openGreenBin.classList.remove('disappear');
}

export function closeTheBins(){
    closedRecyclingBin.classList.remove('disappear');
    closedGarbageBin.classList.remove('disappear');
    closedGreenBin.classList.remove('disappear');

    openRecyclingBin.classList.add('disappear');
    openGarbageBin.classList.add('disappear');
    openGreenBin.classList.add('disappear');
}