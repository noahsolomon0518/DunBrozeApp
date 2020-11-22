console.log("WOKRS")
checklistIcons = document.querySelectorAll("td.checklist-icon")
editChecklistDiv = document.querySelector("div.edit-job")
forms = document.querySelectorAll(".form")




const setUp = function(){
    editChecklistDiv.addEventListener("click", ()=>{
        if(editChecklistDiv.innerHTML == "Edit Job"){
            editJob()
            editChecklistDiv.innerHTML = "Save"
    
        }else{
            saveChecklist()
            editChecklistDiv.innerHTML = "Edit Job"
        }
    })
    
    for(let icon of checklistIcons){
        icon.style.visibility ==  "hidden"
        
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


//Save functions
const saveChecklist = function(){
    for(let icon of checklistIcons){
        icon.style.visibility =  "hidden"
        
    }
}


//Triggers edit functions
const editJob = function(){
    editChecklist()
    editForms()
    
}




setUp()



autocorrect({
    src: function(){
        return ['hello', 'yo']
    },
    parent: "input1"
})

