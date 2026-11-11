const login_section = document.querySelector('#login_form')


login_section.addEventListener('submit', async (e)=>{
    e.preventDefault()
    
    const email = e.target.user_email.value;
    const password = e.target.user_password.value;
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token)
        window.location.assign("../dashboard/dashboard.html")
    } else {
        alert(data.error);
    }

})



