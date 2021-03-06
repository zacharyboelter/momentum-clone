const author = document.getElementById('author')


fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong')
        }
        console.log(res.status)
        return res.json()
    })
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        author.textContent = `Photo: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
        document.getElementById("author").textContent = `Photo: Dodi Achmad`
    })

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong')
        }
        console.log(res.status)
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.getElementById('crypto-top').innerHTML = `
            <img src=${data.image.small} class="crypto-img" />
            <span>${data.name}</span>
            `
        document.getElementById('crypto').innerHTML += `
            <p>Current : $${data.market_data.current_price.usd}</p>
            <p>24 High: $${data.market_data.high_24h.usd}</p>
            <p>24 Low: $${data.market_data.low_24h.usd}</p>
       `
    })
    .catch(err => console.error(err))


function getTime() {
    let d = new Date();
    let n = d.toLocaleTimeString("en-us", { timeStyle: "short" });
    document.getElementById('time').textContent = n
}
setInterval(getTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error('Weather data not available')
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconImage = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            console.log(iconImage)

            document.getElementById('weather').innerHTML = `
                <img src="${iconImage}" />
                <p class="weather-temp">${Math.round(data.main.temp)}??</p>
                <p class="weather-city">${data.name}</p>
                
            `
            // document.getElementById('weather').innerHTML += `
            // <p>${data.name}</p>
            // `
        })
        .catch(err => console.error(err))
});


