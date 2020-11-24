addJob = document.querySelector('.checklist-add-job')
editChecklistDiv = document.querySelector("div.edit-job")
checklist = document.querySelector('table.checklist')
console.log(checklist)
addJob.addEventListener("click", ()=>{
    newRow = document.createElement('tr')
    index = document.querySelectorAll('.checklist-index').length 
    newRow = document.createElement('tr')
    newRow = createRow({index:index, description:'None', timeEstimate: 'None', status:"0" })
    checklist.querySelector('tbody').append(newRow)
    
    
})

const createRow = function(options){
    row = document.createElement('tr')
    tdInd =  createTdInd(options.index)
    tdDesc =  createTdDesc(options.description)
    tdTime =  createTdTime(options.timeEstimate)
    tdStatus =  createTdStatus(options.status)
    row.append(tdInd)
    row.append(tdDesc)
    row.append(tdTime)
    row.append(tdStatus)
    return row
}


//Checklist data
const createTdInd = function(index){
    td = document.createElement('td')
    td.classList.add("checklist-index")
    td.innerHTML = index
    return td
}
const createTdDesc = function(description){
    td = document.createElement('td')
    td.classList.add("checklist-description")
    td.innerHTML = description
    setEditable(td)
    return td
}
const createTdTime = function(time){
    td = document.createElement('td')
    td.classList.add("checklist-time")
    td.innerHTML = time
    return td
}
const createTdStatus = function(status){
    td = document.createElement('td')
    td.classList.add("checklist-time")
    td.innerHTML = status
    return td
}

//Checklist icons





//Utils

const setEditable = function(obj){
    editChecklistDiv.addEventListener("click", ()=>{
        if(editChecklistDiv.innerHTML == "Edit Job"){
            obj.contentEditable = "false"
            obj.classList.remove("editable")
        }else{
            obj.contentEditable = "true"
            obj.classList.add("editable")
            
        }
    })
}