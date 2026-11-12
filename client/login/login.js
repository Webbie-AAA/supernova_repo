const login_section = document.querySelector('#login_form')
const loginError = document.querySelector('#login-error');

login_section.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const form = new FormData(e.target)
    
    const email = e.target.user_email.value;
    const password = e.target.user_password.value;

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,password: password
        })
    }

    try {
        const response = await fetch("http://localhost:3000/users/login", options);

        const contentType = response.headers.get("content-type");
        const data = await response.json();     

        if (response.status == 200) {
            window.location.assign("../dashboard/dashboard.html")
        } else {
            loginError.textContent = "Incorrect email or password";
        }

    } catch (error) {
        console.error("Login error:", error);        
    }

})
