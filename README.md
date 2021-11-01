# Intro
Everything you need to share is in the `build` folder.

This uses the [React](https://reactjs.org/) library to build a component based UI for viewing photos.
- build
    - `index.html` - Loads all the assets and renders the UI in the browser.
    - assets
        - `app.js` - Compiled from `src` using **`npm`**.
        - `scanner.py` - Compiles `settings.js`.
        - `settings.js` - Tells the application where the photos are located. 
        - `styles.css` - Style sheet for the application.
    - photos
        - `default.png` - Default thumbnail for the album covers.
        - "Album Name"
            - high
                - "Photo Name"
            - low
                - "Photo Name"
            - `thumbnail.png` - Album cover thumbnail.

- src
    - `index.tsx` - Set up the App. Compiles to `app.js`.
    - `Settings.ts` - Get the albums and photos from `settings.js`.
    - `tsconfig.json` - Defines settings for the **`TypeScript`** compiler and linter.
    - components
        - `Album.tsx` - Album components. **`AlbumCovers`**, **`AlbumPhotos`**
        - `Photo.tsx` - Photo components. **`PhotoSlide`**, **`Slide`**
        - `App.tsx` - Handles the navigation between viewing Albums and Photos.
- `package-lock.json` - Manages library versions. (auto-generated)
- `package.json` - Defines libraries and other settings for **`npm`**.
- `webpack.config.js` - Defines settings for **`webpack`** to compile the `app.js` file.

# Build
## Photos `settings.js`
The `settings.js` file is built using `scanner.py`. To run, first make sure [**`python`**](https://www.python.org/) is installed:
```bash
python --version
Python 3.8.3
```
Then in the command line run:
```bash
cd build/assets
python ./scanner.py
```
If there are any missing folders or files, it will let you know by saying "Missing 'X'".

## JavaScript `app.js`
The `app.js` file is built using **`npm`** and **`webpack`**. Install [**`node`**](https://nodejs.org/) to get **`npm`**. To make sure **`npm`** is installed run in the command line:
```bash
npm --version
7.6.3
```
Then, in order to download the required libraries (**`TypeScript`**, **`Webpack`**, and **`React`**) in a folder called **`node_modules`**, run: 
```bash
npm install
```
If changes are made in the `src` directory, then `app.js` will need to be rebuilt in order to reflect those changes. To rebuild `app.js` run:
```bash
npm run dev
```