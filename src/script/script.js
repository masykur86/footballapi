$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.carousel').carousel();



  $('.jadwal').click(function (e) { 
    e.preventDefault();
    getJadwal();
  });

  $('.Klasemen').click(function (e) { 
    e.preventDefault();
    getKlasemen();
  });

  $('.tim').click(function (e) { 
    e.preventDefault();
    alert("menu tim");
    getTeam();
  });

  $('.topskor').click(function (e) { 
    e.preventDefault();
    getTopskor();
  });



  $('.saved').click(function (e) { 
    e.preventDefault();
    alert("menu saved");
    getKlasemen();
  });


  getTopskor();
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}
