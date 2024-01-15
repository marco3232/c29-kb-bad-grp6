
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

  });


async function loading() {
  document.querySelector("#loading").style.display = "block";
  console.log("now loading")
    
  try {
    // Perform a fetch request (replace 'url' with your actual URL)
    await fetch('/tripplan_result');

    // Delay the page navigation for 10 seconds
    setTimeout(() => {
        // Navigate to another page (replace 'newPage.html' with your actual page)
        window.location.href = 'tripplan_result.html';
    }, 10000); // 10000 milliseconds = 10 seconds
} catch (error) {
    // Handle any fetch errors here
    console.error('Error during fetch:', error);
}

// To prevent the form from submitting, return false
return false;
}


