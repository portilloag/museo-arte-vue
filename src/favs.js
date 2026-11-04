export function getFavs() {
    const favs = localStorage.getItem('obras_favs')
    return favs ? JSON.parse(favs) : []
}

export function btnFavs(artwork) {
    let favs = getFavs()
    const index = favs.findIndex(item => item.id === artwork.id)

    if (index >= 0) {
        favs.splice(index, 1)
    } else {
        favs.push({
            id: artwork.id,
            nombre: artwork.title,
            img: artwork.image_id,
            autor: artwork.artist_title
        })
    }

    localStorage.setItem('obras_favs', JSON.stringify(favs))
    return favs
}

export function isFav(id) {
    const favs = getFavs()
    return favs.some(item => item.id === id)
}