const login_section = document.querySelector('#login_form')


login_section.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.user_password.value

    const form = new FormData(e.target)
    
    const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: form.get('email'),
        password: form.get('user_password')
    })
}
        
    const response = await fetch('http://localhost:3000/users/login', options)
    const data = await response.json();
    console.log("status: ", response.status)
    console.log("backend response: ", data)

    if (response.status == 200){
        window.location.assign("../dashboard/dashboard.html");
    } else {
        console.log(error)
    }
})



