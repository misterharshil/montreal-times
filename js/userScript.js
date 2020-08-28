/* Global document */

function $(el) { return document.getElementById(el) }

//Edits
function editOn() {
  $("left").classList.add("editing")
  $("name").contentEditable = "true"
  $("bio").contentEditable = "true"
  $("edit").innerHTML = "Save Changes"
  $("edit").onclick = editOff
}
function editOff() {
  $("left").classList.remove("editing")
  $("name").contentEditable = "false"
  $("bio").contentEditable = "false"
  $("edit").innerHTML = "Edit"
  $("edit").onclick = editOn
  for (var i = 0; i < document.getElementsByClassName("name").length; i++) { document.getElementsByClassName("name")[i].innerHTML = $("name").innerHTML }
  if (typeof(Storage) !== "undefined") {
    localStorage.namezjLJwb = $("name").innerHTML
    localStorage.biozjLJwb = $("bio").innerHTML
    localStorage.srczjLJwb = $("profile-pic").src
  }
}
$("edit").onclick = editOn

//Image Upload
$("upload-button").addEventListener("change", function () {
	if (this.files && this.files[0]) {
		var reader = new FileReader()
    reader.onload = function(e) { for (var i = 0; i < document.getElementsByClassName("pic").length; i++) { document.getElementsByClassName("pic")[i].src = e.target.result } }
		reader.readAsDataURL(this.files[0])
	}
})

//Load Local Storage
if (typeof(Storage) !== "undefined" && localStorage.namezjLJwb !== undefined && localStorage.biozjLJwb !== undefined && localStorage.srczjLJwb !== undefined) {
  for (var i = 0; i < document.getElementsByClassName("name").length; i++) { document.getElementsByClassName("name")[i].innerHTML = localStorage.namezjLJwb }
  $("bio").innerHTML = localStorage.biozjLJwb
  for (var i = 0; i < document.getElementsByClassName("pic").length; i++) { document.getElementsByClassName("pic")[i].src = localStorage.srczjLJwb }
} else {
  document.getElementsByClassName("pic").src = "data:image/gif;base64,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"
}