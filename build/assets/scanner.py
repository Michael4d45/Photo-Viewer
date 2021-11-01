import os
import json

settings_file = "settings.js"
photos_dir = "../photos"
js_var = "window.settings = "

# Try to open the settings file and read the data. 
# If the file doesn't exist, then create it.
if os.path.isfile(settings_file):
    with open(settings_file) as json_file:
        try:
            json_file.read(len(js_var))
            data = json.load(json_file)
        except:
            data = {}
else:
    with open(settings_file, 'w') as json_file:
        data = {}

# Fill in default parameters in the settings if they are empty.
data.setdefault('albums', {})

def has_photo(photos, photo):
    '''
    has_photo returns a photo object if the photo exists, and false otherwise
    '''
    for p in photos:
        if p["name"] == photo:
            return p
    return False

# Prepare to remove albums from the settings if they don't exist.
albums_to_delete = list(data["albums"].keys())

# Loop through the albums and generate settings for the application while
# maintaining the old settings.
dirs = os.listdir(photos_dir)
for dir in dirs:
    dir_path = os.path.join(photos_dir, dir)

    if os.path.isdir(dir_path):
        # Add album to settings if not already. If it does, make sure we don't 
        # remove it from the settings later.
        if dir not in data["albums"]:
            data["albums"][dir] = {
                "name": dir,
                "order": -1,
                "photos": []
            }
        else:
            albums_to_delete.remove(dir)

        # Get the album data.
        album = data["albums"][dir]
        
        # Check if there's a thumbnail for the album cover.
        thumbnail = os.path.join(dir_path, "thumbnail.png")
        album["has_thumbnail"] = os.path.isfile(thumbnail)

        # Prepare to remove photos that don't exist from settings.
        photos_to_delete = album["photos"].copy()

        # Get the directories for high and low resolution photos.
        high_res_dir = os.path.join(dir_path, "high")
        low_res_dir = os.path.join(dir_path, "low")

        # Make sure the high and low res directories exist.
        if not os.path.isdir(high_res_dir):
            print("missing " + high_res_dir)
            continue
        if not os.path.isdir(low_res_dir):
            print("missing " + low_res_dir)
            continue

        high_res_photos = os.listdir(high_res_dir)
        low_res_photos = os.listdir(low_res_dir)

        # Create a list of all the photos and make sure there
        # is a matching file in the low res folder.
        photos = []
        for photo in high_res_photos:
            if photo in low_res_photos:
                photos.append(photo)
            else:
                print("missing " + os.path.join(low_res_dir, photo))

        # Making sure there is a match for the low resolution in 
        # the high res folder.
        for photo in low_res_photos:
            if photo not in high_res_photos:
                print("missing " + os.path.join(high_res_dir, photo))

        # Check the photos in the directory, if they aren't already
        # in the settings, then add it. If it is, make sure we
        # don't remove it from the settings later.
        for photo in photos:
            old_photo = has_photo(album["photos"], photo)
            if not old_photo:
                    album["photos"].append({
                        "name": photo,
                        "order": -1,
                    })
            elif old_photo in photos_to_delete:
                photos_to_delete.remove(old_photo)

        # Remove photos from the settings if they don't exits in the files.
        for photo in photos_to_delete:
            album["photos"].remove(photo)

# Remove albums from the settings if they don't exit in the photos directory.
for album in albums_to_delete:
    data["albums"].pop(album)

# Save the updated settings.
with open(settings_file, 'w') as json_file:
    text = js_var + json.dumps(data)
    json_file.write(text)
