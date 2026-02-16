/*
Export your favourite gifs
Vencord is required or any fork of vencord
paste into console using ctrl+shift+i
*/
(() => {
    // 1. Find the module that manages user settings (including fav gifs)
    const FrecencyUserSettings = Vencord.Webpack.find(m => m.ProtoClass?.typeName?.endsWith(".FrecencyUserSettings"));
    
    if (!FrecencyUserSettings) {
        return console.error("Could not find FrecencyUserSettings module. Are you sure Vencord/Equicord is injected?");
    }

    // 2. Extract the GIF URLs (keys of the gifs object)
    const favoriteGifs = Object.keys(FrecencyUserSettings.getCurrentValue().favoriteGifs.gifs);
    
    // 3. Create a JSON blob and trigger download
    const blob = new Blob([JSON.stringify(favoriteGifs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.download = "favorite_gifs.json";
    
    document.body.appendChild(tempLink);
    tempLink.click();
    
    // 4. Cleanup
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);
    
    console.log(`Successfully exported ${favoriteGifs.length} favorite GIFs to favorite_gifs.json`);
})();