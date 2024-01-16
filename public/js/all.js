document.querySelector("#first").innerHTML = `<nav
class="navbar navbar-expand-lg navbar-dark bg-dark"
aria-label="Fifth navbar example"
>
<div class="container-fluid">
  <a class="navbar-brand">Rent n Go</a>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarsExample05"
    aria-controls="navbarsExample05"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExample05">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./pricing.html">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./tripplan.html">Trip-Plan</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./car.html">Cars</a>
      </li>
    </ul>
    <div class="nav-item center-button" id="regis-button">
      <a class="user-icon" href="register.html" role="button">
        <div class="bi bi-key icon-color"></div>
        <div class="button-text">Register</div>
      </a>
    </div>
    <div class="nav-item center-button" id="login-button" role="button">
      <a class="user-icon" href="login.html" role="button">
        <div class="bi bi-person-fill icon-color"></div>
        <div class="button-text">Login</div>
      </a>
    </div>

    <div class="nav-item center-button"></div>
    
    
  </div>
</div>
</nav>`;

window.onload = async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeout = setTimeout(() => {
    controller.abort();
    console.log("Request aborted due to timeout for fetch userid");
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
      ).innerHTML = `<h1 class="id-font">My Dear User</h1>
          <h1 class="id-font">ID#${result.data}</h1>`;

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
