<template lang='pug'>
  div(class='upload row')
    img(:src='imageData' height='30px' class='col-sm-2')
    div.form.col-sm-8
      form(@submit.prevent='onSubmit' enctype='multipart/form-data')
        div.fields.col-sm-8
          input(type='file' ref='file' placeholder="Selecione um arquivo" @change='onSelect')

        div.message.col-sm-2
          h5 {{ message }}
          
        b-button(variant="primary" size='sm' type='submit' class='col-sm-2') Enviar           

</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'Upload',
  data: function() {
    return {
      file: "",
      message: '',
      imageData: ""
    }
  },
  methods: {
    /* 
      FRONTEND - VALIDAÇÕES DO COMPONENTE UPLOAD 
      função onSelect() -
        É chamada a cada alteração no input de arquivo, validando o tipo e o tamanho do arquivo carregado.
      função onSubmit() -
        È chamada toda vez que o arquivo é enviado para o servidor. Utiliza o axios para realizar uma requisição do tipo POST e um feedback de resolução em seguida.
    */
    onSelect() {
      this.previewImage()
      const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png"]
      const file = this.$refs.file.files[0]
      this.file = file
      if(!tiposPermitidos.includes(file.type)){
        this.message = "Apenas imagens são aceitas."
      }
      if(file.size > 500000) {
        this.message = "Arquivo muito grande. O máximo permitido é 50KB"
      }
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios.post(`${baseApiUrl}/upload`, formData)
        this.message = 'Upado!'
      } catch(err) {
        console.log(err)
        this.message = 'Deu ruim.'
      }
    },
    previewImage(e) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>

<style lang='scss'>
.upload { display: flex; justify-content: center;}
</style>