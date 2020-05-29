var dbPromised = idb.open("serieAdb", 1, function(upgradeDb) {
  var klasemenObjectStore = upgradeDb.createObjectStore("klasemen", {
    keyPath: "ID"
  });
  klasemenObjectStore.createIndex("klasemen", "klasemen", { unique: false });
});

function simpanKlasemen() {
  dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    var item = {
        judul: 'Menjadi Android Developer Expert (MADE)',
        isbn: 123456789,
        description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
        created: new Date().getTime()
    };
    store.add(item, 123456789); //menambahkan key "buku"
    return tx.complete;
}).then(function() {
    console.log('Buku berhasil disimpan.');
}).catch(function() {
    console.log('Buku gagal disimpan.')
})
}