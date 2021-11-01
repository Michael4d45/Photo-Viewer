import React, { SyntheticEvent, useState, useLayoutEffect } from "react"
import { Album, Photo } from "../Settings"

const padding = 40

/**
 * The picture. 
 * 
 * The state management maintains the dimensions of the image.
 * The width will be the same as the page. Unless it's too
 * tall, then match the height to the page's.
 * 
 * @param props 
 * @returns Slide component
 */
function Slide(props: { file: string, onClick: () => void }) {

    // Define the state of the component. 
    // Initialized as 0 and null since we don't know anything 
    // until the page loads. 
    const [height, setHeight] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)
    const [img, setImg] = useState<HTMLImageElement | null>(null)

    useLayoutEffect(() => {
        const on_resize = () => update_image(img)

        // If the window size changes, update the dimensions. 
        window.addEventListener('resize', on_resize)

        // Remove the event listener when the component un-mounts.
        return () => { window.removeEventListener('resize', on_resize) }
    })

    // Update the dimensions once the image loads.
    function get_dimensions(e: SyntheticEvent) {
        update_image(e.target as HTMLImageElement)
    }

    // update_image updates the state of the component.
    function update_image(image: HTMLImageElement | null) {
        if (image === null) return
        const window_w = window.innerWidth - padding
        const window_h = window.innerHeight - padding
        const image_w = image.naturalWidth
        const image_h = image.naturalHeight
        const image_aspect = image_w / image_h
        let w = window_w
        let h = w / image_aspect

        if (h > window_h) {
            h = window_h
            w = h * image_aspect
        }

        // When these methods are called, the component updates with new width and height.
        setWidth(w)
        setHeight(h)
        if (img === null) setImg(image)
    }

    return <li className="column">
        <img onLoad={get_dimensions} src={props.file} width={width} height={height} onClick={props.onClick} />
    </li>
}

/**
 * A photo that fits in the window and when 
 * clicked on opens a new tab with the high resolution image.
 * 
 * @param props 
 * @returns PhotoSlide component
 */
function PhotoSlide(props: { photo: Photo, album: Album }) {
    const album = props.album
    const photo = props.photo
    const low_res_file = `./photos/${album.name}/low/${photo.name}`
    const high_res_file = `./photos/${album.name}/high/${photo.name}`

    // The 'open' function is a standard JavaScript function 
    // that loads given URLs. It will open the file.
    function onClick() {
        open(high_res_file)
    }

    return <Slide file={low_res_file} onClick={onClick} />
}

export {
    PhotoSlide,
}