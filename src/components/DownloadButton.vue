  <template>
  <button class="click-button" @click="openFile">
    <span class="button-label">{{ label }}</span>
    <img src="@/assets/file.pdf.icon.svg" alt="icon" class="button-icon" />
  </button>
</template>

<script>
export default {
  name: "DownloadButton",
  props:{
    label:{
      type: String,
      default: "Заява",

    },
    filePath: {
      type: String,
      default: "/src/assets/logo.picture.png"
    },
    
  },
  methods: {
    //    handleClick() {
    //     this.$emit("click"); // Емісія події на головний компонент
    //     console.log("button clicked")
    //     let filePath = '/src/assets/logo.picture.png';
        
    //      let downloadLink = document.createElement('a');
    //     downloadLink.href = filePath;
    //     downloadLink.target = '_blank';
    //     downloadLink.download = '';
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink); 

    //   }, 
    //   openFile() {
    //   const fileUrl = this.filePath.startsWith("/")
    //     ? `${process.env.BASE_URL}${this.filePath}`
    //     : this.filePath;
      
    //   window.open(fileUrl, "_blank");
    // },
    },
};
</script>
<style lang="scss" scoped>
.click-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f4f8ff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #17ABEB;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-left: 48%;
}

.click-button:hover {
  background-color: #e0ecff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.click-button:active {
  background-color: #cfdcff;
}

.button-label {
  font-size: 16px;
  color: #17ABEB;
}

.button-icon {
  width: 20px;
  height: 20px;
}
</style>