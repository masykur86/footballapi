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
    getTeam();
  });

  $('.topskor').click(function (e) { 
    e.preventDefault();
    getTopskor();
  });



  $('.saved').click(function (e) { 
    e.preventDefault();
    getSavedKlasemen();
  });


  getKlasemen();
  showNotifikasiSederhana();

});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/src/script/service-worker.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
        requestPermission();

      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}
function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BM8DgSdSVz2VW7rt8S6Zfm2CJgCmsluuVuiGSOFD7h1FNPM-Xog0XIpnAq9gge2asjqHJPeycKeEve2T6l5qMZg")
          }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
    });
  }
      }
function showNotifikasiSederhana() {
  const title = 'Notifikasi Sederhana';
  const options = {
      'body': 'Ini adalah konten notifikasi dengan gambar ikon.',
      'icon': '/src/img/logo.png',
      'badge': '/src/img/logo.png',
      'image': '/src/img/topSkor.png'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}