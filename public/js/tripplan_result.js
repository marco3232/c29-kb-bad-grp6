console.log("hihih")

async function getResult() {
  let tripplan_res = await fetch('/tripplan_result');
  let tripplan_result = await tripplan_res.json()
  console.log("check tripplan result",tripplan_result)
  return tripplan_result  
}

window.onload = async () => {
    getResult();
    showResult()
  };

async function showResult() {
  let data = await getResult();

  let resultHTML = "";

  for (let entry of data) {
    resultHTML += `
  <tr>
        <th>${entry.routes}</th>
  </tr>
        <tr>
        <td>${entry.name}</td>
        <td>${entry.description}</td>
        <td>${entry.carparkname}</td>
        <td>${entry.carparklink}</td>
        <td>${entry.capacity}</td>
        </tr>
    `;

  }

  document.querySelector(".tripplanArea").innerHTML = resultHTML;
}

  


