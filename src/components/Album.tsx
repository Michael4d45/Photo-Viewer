import React from "react"
import { Album } from "../Settings"
import { PhotoSlide } from "./Photo"

// SetAlbum is a closure that is to be called when an album is selected.
type SetAlbum = (album: null | Album) => void

/**
 * AlbumPhotos is a component that lists all the photos in a row.
 * 
 * @param props 
 * @returns AlbumPhotos component
 */
function AlbumPhotos(props: { album: Album }) {
    const album = props.album
    const images = album.photos.map(photo => <PhotoSlide key={photo.name} photo={photo} album={album} />)
    return <ul className="row">
        {images}
    </ul>
}

/**
 * AlbumCover displays a thumbnail, and when clicked will update the 
 * page in the App component.
 * 
 * @param props 
 * @returns AlbumCover component
 */
function AlbumCover(props: { album: Album, setAlbum: SetAlbum }) {
    const album = props.album
    let thumbnail

    if (album.has_thumbnail)
        thumbnail = <img src={`./photos/${album.name}/thumbnail.png`} />
    else
        thumbnail = <img src="./photos/default.png" />

    function change_album() {
        props.setAlbum(album)
    }

    return <div className="album-cover">
        <div onClick={change_album}>{thumbnail}</div>
        <div>{album.name}</div>
    </div>
}

/**
 * Display a list of AlbumCover components.
 * 
 * @param props 
 * @returns AlbumCovers component
 */
function AlbumCovers(props: { albums: Album[], setAlbum: SetAlbum }) {
    const album_components = props.albums.map(album => <AlbumCover key={album.name} album={album} setAlbum={props.setAlbum} />)
    return <div className="album-covers">
        {album_components}
    </div>
}

export {
    AlbumCovers,
    AlbumPhotos,
}