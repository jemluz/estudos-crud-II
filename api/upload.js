const multer = require('multer')
const path = require('path')

module.exports = app => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => { 
      cb(null, `img-${Date.now()}.${path.extname(file.originalname)}`) 
    },
    fileFilter: (file, cb) => {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error("INCORRECT_FILETYPE"))
      }
      callback(null, true)
    }
  });

  // utiliza a storage para configurar a instância do multer
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 }
  }).single('file');

  // rota de upload
  app.post('/upload', function(req, res){
    upload(req,res,function(err){
      if(err === "INCORRECT_FILETYPE") { 
        console.log(err)
        res.status(422).json({ erro: "Apenas imagens são aceitas."})
      }
       if (err === "LIMIT_FILE_SIZE") {
        console.log(err.code)
        res.status(422).json({ erro: "Arquivo muito grande"})
      } 
      else { 
        res.json({ file: req.file })
      }
    });
  }); 
}