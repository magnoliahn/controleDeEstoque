//importa o expres que é um framework que cria servidor
const express = require('express');
const app = express();
const port = 3001;
 
//necessario para o express entender os http verbs
app.use(express.json());
 
//variavel que vai conter os materias do estoque
let data = {
  materials: []
};
 
//Requisito 1 - Listar materiais
app.get('/materials', (req, res) => {
  res.status(200).json({ materials: data.materials });
});
 
//Requisito 2 - Criar um novo material
app.post('/materials', (req, res) => {
  //pega o objeto 'material' do corpo da requisição
  const { material } = req.body;
  if (!material || !material.name || material.qtde == null) {
    return res.status(400).json({ error: 'Os campos nome e quantidade são obrigatórios' });
  }
 
  //cria o novo  material com id baseado no index da lista
  const newMaterial = {
    id: data.materials.length,
    name: material.name,
    qtde: material.qtde
  };
 
  //adiciona e retorna o 201
  data.materials.push(newMaterial);
  res.status(201).json(newMaterial);
});
 
//Requisito 3 - Buscar um material por ID
app.get('/materials/:id', (req, res) => {
  //pega o id passado na url e converte para o numero
  const id = parseInt(req.params.id);
  //busca o material
  const material = data.materials.find(mat => mat.id === id);
  if (!material) {
    return res.status(404).json({ error: 'Material não encontrado' });
  }
  res.status(200).json({ material });
});
 
//Requisito 4 - Alterar material por ID
app.put('/materials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { material } = req.body;
 
  if (!material || !material.name || material.qtde == null) {
    return res.status(400).json({ error: 'Os campos nome e quantidade são obrigatórios' });
  }
  const materialIndex = data.materials.findIndex(mat => mat.id === id);
  if (materialIndex === -1) {
    return res.status(404).json({ error: 'Material não encontrado' });
  }
  //atualiza dos dados do material
  data.materials[materialIndex].name = material.name;
  data.materials[materialIndex].qtde = material.qtde;
  res.status(200).json(data.materials[materialIndex]);
});
 
//Requisito 5 - Remover material por ID
app.delete('/materials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const materialIndex = data.materials.findIndex(mat => mat.id === id);
 
  if (materialIndex === -1) {
    return res.status(404).json({ error: 'Material não encontrado' });
  }
  data.materials.splice(materialIndex, 1);
  //retorna os materiais já sem o aterial deletado
  res.status(200).json({ materials: data.materials });
});
 
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
 