/**
 * OrderSortable contains order and name 
 * to sort the array of objects by.
 * 
 * Photo and Album are OrderSortable, 
 * which is used in the order_sort function
 * below.
 */
interface OrderSortable {
    order: number
    name: string
}

interface Photo extends OrderSortable {
}

interface Album extends OrderSortable {
    photos: Photo[]
    has_thumbnail: boolean
}

interface Settings {
    albums: { [name: string]: Album }
}

// From the settings.js file.
const settings: Settings = (window as any).settings

/**
 * Returns a comparison between 'a' and 'b'.
 * 
 * -1 : 'a' goes before 'b'
 * 0 : 'a' and 'b' are similar
 * 1 : 'b' goes before 'a'
 * 
 * Note: the implementation does not sort numerically.
 * It sorts as such: 
 * "1" < "10" < "100" < "2" < "20" < "200" < "3"
 * 
 * @param a
 * @param b 
 * @returns -1 | 0 | 1 
 */
function alpha_sort(a: string, b: string): -1 | 0 | 1 {
    let fa = a.toLowerCase(),
        fb = b.toLowerCase()

    if (fa < fb) return -1
    if (fa > fb) return 1
    return 0
}

/**
 * Sort the given array first by 'order', and then by 'name'.
 * 
 * Though 'order' doesn't have an interface yet for editing,
 * 'order' can be manually edited in the 'settings.js' file.
 * 
 * @param array array to sort
 */
function sort_order(array: OrderSortable[]) {
    array.sort((a, b) => {
        const order = a.order - b.order
        if (order === 0)
            return alpha_sort(a.name, b.name)
        else
            return order
    })
}

/**
 *  Get a sorted array of albums.
 * 
 * @param albums from the settings
 * @returns sorted array
 */
function get_albums() {
    const album_array: Album[] = Object.values(settings.albums)

    // Sort the photos
    album_array.forEach(album => sort_order(album.photos))

    // Sort the albums.
    sort_order(album_array)

    return album_array
}

function get_album_by_name(name: string) {
    return settings.albums[name] || null
}

export {
    Photo,
    Album,
    get_albums,
    get_album_by_name,
}