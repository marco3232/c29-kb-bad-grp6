// document.querySelector(
//     ".first"
//   ).innerHTML = ` 
//           <a class="bi bi-person-fill" onclick="goToLink('user_page.html')"></a>
//   `;

// async function goToLink(target_url) {

//     let res = await fetch(`${target_url}`)
  
//     if (res.status == 401) {
//       console.log("required login")
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "You have to log in first",
//       }).then(() => {
//         console.log('go to login')
  
//         window.location.href = '/login.html'
//       })
//     }
  
//     else if (res.status = 200) {
//       window.location.href = target_url
//     }
  
//   }