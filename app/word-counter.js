//declare HTML elements as JS variables
const input = document.getElementById('input');
const words = document.getElementById('words');
const characters = document.getElementById('characters');
const charactersNoSpaces = document.getElementById('characters-no-spaces');
const exportBox = document.getElementById('export-button');
const counter = document.getElementById('counters-frame');
const carousel = new bootstrap.Carousel(counter);
const prevButton = document.getElementById('carousel-control-prev');
const nextButton = document.getElementById('carousel-control-next');
const lightDarkSwitch = document.getElementById('switch');
//carousel navigation
prevButton.addEventListener('click', function () {
    carousel.to('prev');
})
nextButton.addEventListener('click', function () {
    carousel.to('next');
})
//switch between dark and light modes
lightDarkSwitch.addEventListener('change', () => {
	document.body.classList.toggle('dark');
	counter.classList.toggle('dark');
	exportBox.classList.toggle('dark');
    input.classList.toggle('dark-input');
});
//on input into textarea element
input.addEventListener('input', function() {
    words.innerText = `${input.value.match(/\S+/g)?.length || 0} word(s)`;//show words count obtained using regex
    characters.innerText = `${input.value.split('\n').join('').length} character(s)`;//show characters count obtained using regex
    let charCount = input.value.split(/\s+/).join('').length;//save sanititzed characters number into a variable
    charactersNoSpaces.innerText = `${charCount} character(s)(excluding spaces)`;//show sanitized characters count
    if(charCount > 0) {//if no characters are inputted, don't show export button
        exportBox.style.display = "block";
    } else {
        exportBox.style.display = "none";
    }
}, false);
//on click on the export button
exportBox.addEventListener('click', function() {
    let sanitizedInput = input.value.replace(/\n/g, "\r\n");//sanitize input to keep linebreaks in .txt file
    sanitizedInput = `${sanitizedInput}
        \n\n\nStats:
        --->   ${words.innerText}
        --->   ${characters.innerText}
        --->   ${charactersNoSpaces.innerText}
    `//add stats at the end of the text
    let blob = new Blob([sanitizedInput], { type: "text/plain"});//create txt blob
    //create an anchor and assign all the required properties to export textarea text
    let anchor = document.createElement("a");
    anchor.download = "your-text.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none";
    //add anchor to HTML, programmatically click it and remove when done
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}, false);