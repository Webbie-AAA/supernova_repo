const registration_section = document.querySelector('#register_form')


registration_section.addEventListener("submit", async (e) =>{
    e.preventDefault()
    const first_name = e.target.first_name.value
    const last_name = e.target.last_name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const confirm_password = e.target.confirm_password.value
    const form = new FormData(e.target)
    // console.log(form)
    
    const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        first_name: form.get('first_name'),
        last_name: form.get('last_name'),
        email: form.get('email'),
        password: form.get('password'),
    })
}
    const response = await fetch('http://localhost:3000/users/register', options)
    const data = await response.json()
    console.log("status: ", response.status)
    console.log("backend response: ", data)

    if (response.status == 201){
        window.location.assign("../login/login.html");
    } else {
        console.log('error')
    }
})


