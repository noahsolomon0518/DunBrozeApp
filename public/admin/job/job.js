checklistIcons = document.querySelectorAll("td.checklist-icon")
editChecklistDiv = document.querySelector("div.edit-job")
forms = document.querySelectorAll(".form")
addJob = document.querySelector(".checklist-add-job")



const setUp = function(){
    editChecklistDiv.addEventListener("click", ()=>{
        if(editChecklistDiv.innerHTML == "Edit Job"){
            editJob()
            editChecklistDiv.innerHTML = "Save"
    
        }else{
            saveEditJob()
            editChecklistDiv.innerHTML = "Edit Job"
        }
    })


    
    for(let icon of checklistIcons){
        icon.style.visibility =  "hidden"
        
    }
}


//Edit functions
const editChecklist = function(){
    for(let icon of checklistIcons){
        icon.style.visibility =  "visible"
    }
}

const editForms = function(){
    console.log(forms)
    for(let form of forms){
        form.readOnly = false
        form.classList.add("editable")
    }
}

const editAddJob = function(){
    addJob.style.visibility = "visible"
}





//Save functions
const saveChecklist = function(){
    for(let icon of checklistIcons){
        icon.style.visibility =  "hidden"
        
    }
}

const saveForms = function(){
    for(let form of forms){
        form.readOnly = true
        form.classList.remove("editable")
    }
}

const saveJobs = function(){
    addJob.style.visibility = "hidden"
}


//Triggers edit functions
const editJob = function(){
    editChecklist()
    editForms()
    editAddJob()
}


const saveEditJob = function(){
    saveChecklist()
    saveForms()
    saveJobs()
}

setUp()



