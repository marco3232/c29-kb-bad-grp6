console.log("Wellcome to the tripplan result js");

window.onload = async () => {
  getResult();
  console.log("check call getresult function1111",getResult());

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

    console.log("check entry of data", data);
  }

  document.querySelector(".result").innerHTML = resultHTML;

  async function getResult() {
    let tripplan_res = await fetch("/tripplan_result");
    let tripplan_result = await tripplan_res.json();
    return tripplan_result;
  }
};
