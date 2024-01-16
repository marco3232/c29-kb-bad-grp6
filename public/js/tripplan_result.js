window.onload = async () => {
    getResult();


  let data = await getResult();

  let resultHTML = "";

  for (let entry of data) {
    resultHTML += `
  <tr>
        <th>${entry.routes[0]}</th>
  </tr>
        <tr>
        <td>${entry.name[0]}</td>
        <td>${entry.description[0]}</td>
        <td>${entry.carparkname[0]}</td>
        <td>${entry.carparklink[0]}</td>
        <td>${entry.capacity[0]}</td>
        </tr>
    `;

  }

  document.querySelector(".result").innerHTML = resultHTML;
};



async function getResult() {
  let tripplan_res = await fetch("/tripplan_result");
  let tripplan_result = await tripplan_res.json()
  return tripplan_result
  
}