// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
//////////////////// html Elements ////////////////
const nameInp = document.getElementById('input-comp-name')
const tagInp = document.getElementById('input-comp-tag')
const categoryInp = document.getElementById('input-comp-category')
const classInp = document.getElementById('input-comp-class')
const attributeInp = document.getElementById('input-comp-attributes')
const styleInp = document.getElementById('input-comp-style')
const newButton = document.getElementById('new-btn')
const saveButton = document.getElementById('save-btn')
  // Sidebar elements //
const compUl = document.getElementById('comp-ul')
//////////////////// html Elements End ////////////////

//////////////////// Event Listeners ////////////////
// submitButton.addEventListener('click', event => {
//   event.preventDefault()
//   submitCalLog()
// })

saveButton.addEventListener('click', event => {
  submitComponent()
})

compUl.addEventListener('click', event => {
  delComponent(event)
})

//////////////////// Event Listeners End ////////////////

//////////////////// Event Methods ////////////////

let submitComponent = () => {

  let compPostObj = {
    component: {
      name: nameInp.value,
      category: categoryInp.value,
      compclass: classInp.value,
      attribs: attributeInp.value,
      style: styleInp.value
    }
  }

  postComponent(compPostObj)
}

let delComponent = event => {
  if (event.target.classList.value.split(" ").includes("cust-del")) {
    let compId = parseInt(event.target.parentNode.id.substr(-1))
    fetchDeleteComp(compId)
  }
}

//////////////////// Event Methods End ////////////////

//////////////////// Fetch Methods ////////////////
let getCalItems = () => {
  fetch("http://localhost:3000/api/v1/calorie_entries")
  .then(resp => resp.json())
  .then(data => {
    console.log(data)

    let renderAllItems = respData => {

    }
  })
}

let getCompItems = () => {
  fetch("http://localhost:3000/api/v1/components")
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    renderAllItems(data)
  })
}

let postComponent = compData => {
  fetch("http://localhost:3000/api/v1/components", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(compData)
  })
  .then(resp => resp.json())
  .then(respData => {
     console.log("This is the resp", respData)
     renderCompItem(respData)
  })
}

let fetchDeleteComp = id => {
  fetch(`http://localhost:3000/api/v1/components/${id}`, {method: "DELETE"})
  .then( () => {
    let compItem = findCompItem(id)
    deleteItem(compItem)
  })
}
//////////////////// Fetch Methods End ////////////////

//////////////////// Render Methods ////////////////
let renderCompItem = compData => {
  compUl.innerHTML += nightmareLi(compData)
}

let renderAllItems = respData => {
  respData.forEach(obj => renderCompItem(obj))
}

let deleteItem = node => {
  compUl.removeChild(node)
}
//////////////////// Render Methods End ////////////////

//////////////////// Helper Methods ////////////////
// let nightmareLi = calResp => {
//   return (`
//   <li id="cal-item-${calResp.id}" class="calories-list-item">
//     <div class="uk-grid">
//       <div class="uk-width-1-6">
//         <strong>${calResp.calorie}</strong>
//         <span>kcal</span>
//       </div>
//       <div class="uk-width-4-5">
//         <em class="uk-text-meta">${calResp.note}</em>
//       </div>
//     </div>
//     <div class="list-item-menu">
//       <a class="edit-button uk-icon" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="pencil"><path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z"></path><path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148"></path></svg></a>
//       <a class="delete-button uk-icon" uk-icon="icon: trash"><svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="trash"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"></polyline><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"></polyline><rect x="8" y="7" width="1" height="9"></rect><rect x="11" y="7" width="1" height="9"></rect><rect x="2" y="3" width="16" height="1"></rect></svg></a>
//     </div>
//   </li>
//   `)
// }

let nightmareLi = compResp => {
  return (`
    <a href="#" id="list-comp-${compResp.id}" class="list-group-item list-group-item-action comp-item">
      ${compResp.name}
      <button class="btn btn-sm btn-danger cust-del">X</button>
    </a>
  `)
}

let findCompItem = id => {
  return document.getElementById(`list-comp-${id}`)
}
//////////////////// Helper Methods End ////////////////

//////////////////// App Runner Methods ////////////////
getCompItems()
