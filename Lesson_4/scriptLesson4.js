
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("myBtn").addEventListener("click", function () {
        regexp = new RegExp("\B'|'\B", 'g')
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            document.getElementById('file').innerText = this.result.replace(/^'"'$/g, '$1"$2');

            console.log(this.result.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2')
            )
        });
        reader.readAsText(document.querySelector('input').files[0]);

    });;
})
