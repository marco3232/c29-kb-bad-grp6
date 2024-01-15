console.log("Wellcome to the index js");
window.onload = async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeout = setTimeout(() => {
    controller.abort();
    console.log("Request aborted due to timeout");
  }, 1000);

  try {
    let res = await fetch("/user/userid", { signal });
    console.log("let me see see res index js 111", res);

    if (res.status == 200) {
      clearTimeout(timeout);

      let result = await res.json();
      console.log("Check indjs delay 222", result);

      document.querySelector(
        "#id-display"
      ).innerHTML = `<h1 class="id-font">Login susccess!!Enjoy!!</h1>
        <h1 class="id-font">My Dear User ID#${result.data}</h1>`;

      console.log("check result in index js333");

      document.querySelector(
        "#login-button"
      ).innerHTML = `<div class="nav-item center-button" id="logout-button" role="button">
              <a class="user-icon">
              <div class="bi bi-person-fill icon-color"></div>
              <div class="button-text">Logout</div>
            </a>
            </div>`;
      document.querySelector("#regis-button").innerHTML = "";

      addLogoutEventListener();
      console.log("check indjs delay addeventlis 444");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.log("Error occurred during fetch:", error);
    }
  }
};

function addLogoutEventListener() {
  let target = document.querySelector("#logout-button");

  target.addEventListener("click", async (e) => {
    e.preventDefault();

    const res = await fetch("/user/logout");

    if (res.status == 200) {
      Swal.fire({
        title: "Good job!",
        text: "Logout success!",
        icon: "success",
      });

      setTimeout(() => (window.location.href = "./index.html"), 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Logout Failed",
      });
    }
  });
}
