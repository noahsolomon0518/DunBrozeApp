console.log("WOKRS")
checklistIcons = document.querySelectorAll("td.checklist-icon")
editChecklistDiv = document.querySelector("div.edit-checklist")


editChecklistDiv.addEventListener("click", ()=>{
    if(editChecklistDiv.innerHTML == "Edit Checklist"){
        editChecklist()
        editChecklistDiv.innerHTML = "Submit Checklist"

    }else{
        saveChecklist()
        editChecklistDiv.innerHTML = "Edit Checklist"
    }
})

for(let icon of checklistIcons){
    icon.style.visibility ==  "hidden"
    
}


const editChecklist = function(){
    for(let icon of checklistIcons){
        icon.style.visibility =  "visible"
        
    }
}

const saveChecklist = function(){
    for(let icon of checklistIcons){
        icon.style.visibility =  "hidden"
        
    }
}

