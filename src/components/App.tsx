import React, { useState } from "react"
import { Album, get_albums, get_album_by_name } from "../Settings"
import { AlbumPhotos, AlbumCovers } from "./Album"

// Gets the array of albums from 'Settings.ts'
const albums = get_albums()

/**
 * Looks at the hash in the URL (where the '#' is at the end)
 * and returns the album with the corresponding name.
 * 
 * @returns Album if found, null otherwise
 */
function get_album_from_hash(): Album | null {
    const hash = window.location.hash
    const name = decodeURIComponent(hash).substr(1)
    return get_album_by_name(name)
}

/**
 * App is used in 'index.tsx'.
 * It loads an album if it is found in the URL, otherwise
 * the list of albums will display for selection.
 * 
 * @returns App component
 */
export default function App() {

    const [album, setAlbum] = useState<Album | null>(get_album_from_hash())

    window.addEventListener('hashchange', () => setAlbum(get_album_from_hash()))

    let page = <></>

    if (album === null) {
        page = <AlbumCovers albums={albums} setAlbum={setAlbum} />
    }
    else {
        window.location.assign('#' + album.name)
        page = <AlbumPhotos album={album} />
    }

    return <div>
        {page}
    </div>
}