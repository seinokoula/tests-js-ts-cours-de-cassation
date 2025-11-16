// Donner 3 manières différentes d'itérer sur un tableau d'objet pour retourner leur id (input._id)
// Aucune de ces 3 manières ne doit changer le tableau initial

module.exports.iterationUn = (dataSet) => {
  return dataSet.map(item => item._id);
};

module.exports.iterationDeux = (dataSet) => {
  const result = [];
  for (const item of dataSet) {
    result.push(item._id);
  }
  return result;
};

module.exports.iterationTrois = (dataSet) => {
  return dataSet.reduce((acc, item) => {
    acc.push(item._id);
    return acc;
  }, []);
};

// Même exercice mais cette fois la fonction doit changer l'état initial et retourner la longueur du tableau
module.exports.iterationQuatre = (dataSet) => {
  for (let i = 0; i < dataSet.length; i++) {
    dataSet[i] = dataSet[i]._id;
  }
  return dataSet.length;
};

// Vous devez réimplémenter Promise.allSettled (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
module.exports.allSettled = (promises) => {
  const wrappedPromises = promises.map(promise =>
    Promise.resolve(promise)
      .then(value => ({ status: 'fulfilled', value }))
      .catch(reason => ({ status: 'rejected', reason }))
  );

  return Promise.all(wrappedPromises);
};

// Corrigez mais surtout, expliquez pourquoi le test ne passe pas
// EXPLICATION DU PROBLÈME :

// sans préserver le contexte (this) de l'objet Henri.

// En JavaScript, le mot-clé 'this' dans une fonction dépend de COMMENT la fonction est appelée,
// pas de où elle est définie. Quand on fait :

//   func(); Appel sans contexte

// ne fait plus référence à Henri, mais à undefined ou à l'objet global.
// Donc this.name retourne undefined au lieu de "Henri".

// Solutions utilisée :
// Utiliser .bind() pour lier explicitement le contexte

module.exports.introduceHenri = (createCharacter) => {
  const Henri = createCharacter("Henri");
  // Solution 1 : Utiliser .bind() pour lier le contexte 'this' à Henri
  return Henri.introduce.bind(Henri);
};
