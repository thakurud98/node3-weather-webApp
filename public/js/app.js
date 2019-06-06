console.log("called")

let weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#para1')
const para2 = document.querySelector('#para2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    para1.textContent = 'Loading...'
    para2.textContent = ''
    fetch('http://localhost:4000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                // return console.log("Data", data.error)
                return para1.textContent = data.errorMessage
            }
            para1.textContent = data.location
            para2.textContent = data.forecast
        })
    }).catch((error) => {
        console.log("error", error)
    })
})

