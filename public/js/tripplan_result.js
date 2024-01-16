window.onload = async () => {
    getResult();


  let data = await getResult();

  let resultHTML = "";

  for (let entry of data) {
    resultHTML += `
  <tr>
    <th>${entry.routes}</th>
        </tr>
        </thead>
        <tr>
        <td>${entry.name}</td>
        <td>${entry.description}</td>
        <td>${entry.carparkname}</td>
        <td>${entry.carparklink}</td>
        <td>${entry.capacity}</td>
        </tr>
    `;
  }
  document.querySelector(".result").innerHTML = resultHTML;
};



async function getResult() {
  let tripplan_res = await fetch('/tripplan_result');
  let tripplan_result = await tripplan_res.json()
  return tripplan_result
  
}