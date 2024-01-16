
console.log("tripplan")


document
  .querySelector("#tripplan")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("testtt")

    const form = event.target
    const formObject = {
      numberOfRenters: form.numberOfRenters.value,
      relationship: form.relationship.value,
      ageRange: form.ageRange.value,
      rentalDays: form.rentalDays.value,
      rentalPurpose: form.rentalPurpose.value,
    }
    console.log("formObject",formObject)
    const res = await fetch('/tripplan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),

    })
    console.log("im frontend",res)
    // const result = await res.json()
    // document.querySelector('#contact-result').textContent = result.error

    // document.querySelector('loadingGif').style.display = 'block';

      console.log("check result",res)
      if (res.status == 200) {
        console.log("Data sent to Python server successfully")

          window.location.href = "tripplan_result.html";
        }else{
          console.log("data sent to node, but cannot fetch")
          alert("Something Wrong! Please try again");
          window.location.reload()
        }
  });


async function loading() {
  document.querySelector("#loading").style.display = "block";
  console.log("now loading")
    
return false;
}


