const express = require('express')

//creation de notre application: application express
const app = express()

//prend toutes les requêtes qui ont comme Content-Type application/json  
// et met à disposition leur body (pour pouvoir lire des post, put...) dans req.body
app.use(express.json())

// si on ne met pas de rep, express envoie une reponse 404 automatiquement

// Une application Express est une série de fonctions qu'on appel middleware.
// c'est ces fonction qui seront utilisé lors d'un appel serveur
// Chaque élément de middleware reçoit req et res , peut les lire, les analyser et les manipuler.
// la méthode next , qui permet de passer l'exécution au middleware suivant.

//exercice
// app.use((req, res, next) => {
//   console.log('Requête reçue !');
//   next();
// });

// //permet de définir le code réponse (sinon on a une 200)
// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res) => {
//   console.log('Réponse envoyée avec succès !');
// });


//CORS est un système de sécurité qui bloque par défaut les appels HTTP entre des serveurs différents, 
// Dans notre cas, nous avons deux origines : localhost:3000 et localhost:4200 et nous souhaiterions qu'elles puissent communiquer entre elles. 
// il faut ajouter des headers à notre objet response
//ce doit être le 1er middleware executé par le serveur
// il n'y a pas de route car il est général
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //tout le monde pourra acceder à l'api
  //permet d'ajouter les headers aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // permet d'envoyer des requêtes avec les méthodes choisies
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// en premier argument on a le endpoint de la route
//le .use sera ciblé par toutes les methodes http (get, post...) donc on le remplace par get
//app.use('/api/stuff', (req, res, next) => {
app.get('/api/stuff', (req, res, next) => {
  //pour l'instant, comme on a pas de BDD, on crée les objets a retourner
  //les prix sont en centimes pour éviter les chiffres à virgules
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];

  //on donne en réponse un statut 200 et le json
  res.status(200).json(stuff);
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

// on export notre appli pour y avoir acces dans les autres fichiers (notament notre serveur node)
module.exports = app;