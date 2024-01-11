let current = null;
document.querySelector("#email").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: 0,
      duration: 2000,
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
      duration: 2000,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});

document.querySelector("#tel").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: -660 ,
      duration: 2000,
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
//       value: -800,
//       duration: 700,
//       easing: "easeOutQuart",
//     },
//     strokeDasharray: {
//       value: "540 1386",
//       duration: 700,
//       easing: "easeOutQuart",
//     },
//   });
// });

console.log("Wellcome to register js");

function overrideLoginDefaultAction() {
  let target = document.querySelector("#regis-form");

  target.addEventListener("submit", async (e) => {
    console.log("register submit triggered");
    e.preventDefault();

    const res = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
        tel: target.tel.value,
      }),
    });
    console.log("HTel",res)
    // console.log("HEHEHEHEEH",res.body)

    if (res.status == 200) {
      const result = await res.json();
      console.log("seeeeeeeeeee",result);

      window.location.href = "login.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "[Registration Failed]Email already exist!!!",
      });
    }
  });
}

overrideLoginDefaultAction();
