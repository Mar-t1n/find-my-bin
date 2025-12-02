const closedRecyclingBin = document.querySelector('#closed-recycling-bin');
const openRecyclingBin = document.querySelector('#open-recycling-bin');
const closedGarbageBin = document.querySelector('#closed-garbage-bin');
const openGarbageBin = document.querySelector('#open-garbage-bin');
const closedGreenBin = document.querySelector('#closed-green-bin');
const openGreenBin = document.querySelector('#open-green-bin');


export function openBin(binType){
    const type = binType.toLowerCase();
    
    if(type === "recycling"){
        closedRecyclingBin.classList.add('disappear');
        openRecyclingBin.classList.remove('disappear');
    } else if(type === "trash"){
        closedGarbageBin.classList.add('disappear');
        openGarbageBin.classList.remove('disappear');
    } else if(type === "compost"){
        closedGreenBin.classList.add('disappear');
        openGreenBin.classList.remove('disappear');
    }
}

export function closeBin(binType){
    const type = binType.toLowerCase();
    
    if(type === "recycling"){
        closedRecyclingBin.classList.remove('disappear');
        openRecyclingBin.classList.add('disappear');
    } else if(type === "trash"){
        closedGarbageBin.classList.remove('disappear');
        openGarbageBin.classList.add('disappear');
    } else if(type === "compost"){
        closedGreenBin.classList.remove('disappear');
        openGreenBin.classList.add('disappear');
    }
}