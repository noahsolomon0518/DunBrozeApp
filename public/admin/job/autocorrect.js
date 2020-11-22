options = {
    src: function(){
        return ['hello', 'yo']
    },
    parent: "input1"
}

autocorrect = async function(options){
    console.log("autocorrecting")
    results = await options.src()
    input = document.createElement("input")
    parent = document.querySelectorAll("#"+options.parent)[0]
    parent.appendChild(input)


    input.addEventListener("focus", ()=>{
        for(let item of results){
            option = document.createElement("div")
            option.innerHTML = item
            option.classList.add("option")
            parent.appendChild(option)
        }
    })

    input.addEventListener("blur", ()=>{
        console.log('blur')
        options = document.querySelectorAll(".option")
        for(let item of options){
            item.remove()
        }
    })

    input.addEventListener("keydown", ()=>{
        if(document.activeElement==this){
            input.blur()
            input.focus()
        }
    })
}



