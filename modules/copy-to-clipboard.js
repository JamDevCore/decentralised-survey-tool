function copyToClipboard(id) {
    // Get the text field
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);

  }

  export default copyToClipboard