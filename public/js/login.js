let current = null;
document.querySelector("#email").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});
document.querySelector("#password").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});
// document.querySelector("#submit").addEventListener("focus", function (e) {
//   if (current) current.pause();
//   current = anime({
//     targets: "path",
//     strokeDashoffset: {
//       value: -730,
//       duration: 700,
//       easing: "easeOutQuart",
//     },
//     strokeDasharray: {
//       value: "530 1386",
//       duration: 700,
//       easing: "easeOutQuart",
//     },
//   });
// });

console.log("Wellcome to login js");

function overrideLoginDefaultAction() {
  let target = document.querySelector("#login-form");

  target.addEventListener("submit", async (e) => {
    console.log("login submit triggered");
    e.preventDefault();

    const res = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
      }),
    });

    if (res.status == 200) {
      const result = await res.json();
      console.log(result);

      window.location.href = "index.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed",
      });
    }
  });
}

overrideLoginDefaultAction();
