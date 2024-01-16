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
  <td> </td>
  <td>${entry.name}</td>
  <td>${entry.description}</td>
  <td>${entry.carparkname}</td>
  <td>${entry.carparklink}</td>
  <td>${entry.capacity}</td>
  </tr>
    `;

  }

  document.querySelector(".tripplanResult").innerHTML = resultHTML;
}

  




// <tr>
// <th>${entry.routes}</th>
// <th>景點描述</th>
// <th>附近停車場</th>
// <th>附近停車場GOOGLE MAP連結</th>
// <th>停車場可供車位</th>
// </tr>
// <tr>
// <td>${entry.name}</td>
// <td>${entry.description}</td>
// <td>${entry.carparkname}</td>
// <td>${entry.carparklink}</td>
// <td>${entry.capacity}</td>
// </tr>