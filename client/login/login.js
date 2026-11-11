const login_section = document.querySelector('#login_form')


login_section.addEventListener('submit', async (e)=>{
    e.preventDefault()
    console.log(e)

    const email = e.target.user_email.value;
    console.log(email)

})
    // const form = new FormData(e.target)}
    // console.log(form)

//     const options = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         first_name: form.get('first_name'),
//         last_name: form.get('last_name'),
//         email: form.get('email'),
//         password: form.get('password'),
//     })
// }
//     const response = await fetch('http://localhost:3000/users/register', options)
//     const data = await response.json()
//     console.log("status: ", response.status)
//     console.log("backend response: ", data)

//     if (response.status == 201){
//         window.location.assign("../login/login.html");
//     } else {
//         console.log('error')
//     }
// })


