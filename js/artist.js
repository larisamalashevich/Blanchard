document.addEventListener('DOMContentLoaded',function() {
const ids = document.querySelector('#ids').querySelectorAll('a')


document.querySelector('#content').querySelectorAll('.artist').forEach((artist) => {
    
    artist.hidden = true
        } )
    document.querySelector('#Доменико_Гирландайо').hidden = false

ids.forEach(link => {
    link.addEventListener('click', (event) => {
        document.querySelector('#content').querySelectorAll('.artist').forEach((artist) => {
            
            artist.hidden = true
        } )
        document.querySelector(link.dataset.target).hidden = false
    })
})
})