const upload_btn = document.getElementById('upload-btn');

upload_btn.addEventListener('click', function () 
{
  let filePath = '/src/assets/logo.picture.png'; 
  let downloadLink = document.createElement('a'); 
  downloadLink.href = filePath;
  downloadLink.target = '_blank'; 
  downloadLink.download = ''; 
  document.body.appendChild(downloadLink); 
  downloadLink.click(); 
  document.body.removeChild(downloadLink); 
  console.log("It's really working!");
});


 /* handleClick() {
        this.$emit("click"); // Емісія події на головний компонент
        console.log("button clicked")
        //let filePath = '/src/assets/logo.picture.png';
        
         let downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.target = '_blank';
        downloadLink.download = '';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink); 

      }, */
