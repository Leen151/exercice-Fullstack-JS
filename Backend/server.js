//pour créer un programme qui attend des requête http et qui va y répondre
const http = require('http');
//on récupère notre app express
const app = require('./app');

//exercice :maintenant on a acces à l'objet http et on peut créer un serveur
//createServer prend en param une fonction
//cette fonction sera appelée a chaque requete reçu par le serveur
// cette fonction a 2 arguments : req et res
// const server = http.createServer((req, res) => {
//   res.end('Voilà la réponse du 1er serveur !');
// })

//la fonction normalizePort renvoie un port valide 
// qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
//on doit dire à l'appli express sur quel port elle va tourner : le port 3000
// si il n'est pas dispo, l'environnement indique un port à utiliser (process.env.PORT)
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//fonction de traitement des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//notre serveur va retourne notre application
//c'est l'application va recevoir la req et la rep et va les modifier
const server = http.createServer(app)

//écoute les erreurs du serveur
server.on('error', errorHandler);

//écouteur d'évènements enregistré pour consigner le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//le serveur va écouter les requêtes sur le port définit plus tot
server.listen(port)