var dbPromised = idb.open("serieAdb", 1, function(upgradeDb) {
  var klasemenObjectStore = upgradeDb.createObjectStore("klasemen", {
    keyPath: "position"

  });
  klasemenObjectStore.createIndex("position", "position", { unique: false });
});


function simpanKlasemen(standings) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("klasemen", "readwrite");
           standings.forEach(element => {       
        var store = tx.objectStore("klasemen");   
        store.add(element);
      });    
      return tx.complete;
    })
    .then(function() {
      console.log("Klasemen Disimpan");
    }).catch(alert("Data Sudah Tersimpan"));
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("klasemen", "readonly");
        var store = tx.objectStore("klasemen");
        return store.getAll();
      })
      .then(function(standings) {
        resolve(standings);
      });
  });
}