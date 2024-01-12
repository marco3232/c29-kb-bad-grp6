
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
    

  });

  