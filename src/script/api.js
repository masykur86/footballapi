const base_url = "http://api.football-data.org/v2/";
const proxyurl = "https://mighty-refuge-91128.herokuapp.com/";

function getKlasemen() { 
    if ("caches" in window) {
        caches.match(base_url+'competitions').then(function(response) {
          if (response) {
            response.json().then(function(data) {
                $('#content').load("./src/content/klasemen.html", function (response, status, request) {
                  this; // dom element
                var posisi = responseJson.standings[0].table;
                var tim ="";
                posisi.forEach(element => {      
                  const {position,draw,won, points, lost,playedGames,goalsFor,goalDifference,goalsAgainst} = element;
                  const team = element.team;
                  const {name,crestUrl} = team;
                  console.log(name);
                  tim +=(`
                  <tr>
                 <td>${position}</td>
                 <td>${name} <img src="${crestUrl}" alt=""></td>
                 <td>${playedGames}</td>
                 <td>${won}</td>
                 <td>${draw}</td>
                 <td>${lost}</td>
                 <td>${goalDifference}</td>
                 <td>${points}</td>
               </tr>
                 `);
                 
                });
                
                $('#klasemen').html(tim)
          
                  
                });
            });
          }
        });
      }

    const klasemen = async () => {
        try {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "b6ad32fdee65494584a367eb4b648e90"              
                }               
            }
          const response = await fetch(proxyurl+base_url+'competitions/2019/standings',options);
          const responseJson = await response.json();
          if(responseJson.error) {
             showResponseMessage(responseJson.message);
          } else {
              $('#content').load("./src/content/klasemen.html", function (response, status, request) {
              this; // dom element
            var posisi = responseJson.standings[0].table;
            var tim ="";
            posisi.forEach(element => {    
                const {position,draw,won, points, lost,playedGames,goalsFor,goalDifference,goalsAgainst} = element;
          
              const team = element.team;
              const {name,crestUrl} = team;            
              tim +=(`
              <tr>
             <td>${position}</td>
             <td>${name} <img src="${crestUrl}" alt=""></td>
             <td>${playedGames}</td>
             <td>${won}</td>
             <td>${draw}</td>
             <td>${lost}</td>
             <td>${goalDifference}</td>
             <td>${points}</td>
           </tr>
             `);
             
            });
            
            $('#klasemen').html(tim)
      
              
            });
            
       
          }
        } catch(error) {
           console.log(error);
        }
    }
    klasemen();
}

function getTopskor() {
  

  if ("caches" in window) {
      caches.match(base_url+'competitions/SA/scorers').then(function(response) {
        if (response) {
          response.json().then(function(data) {
            
            $('#content').load("./src/content/klasemen.html", function (response, status, request) {
              this; // dom element
            var posisi = data.scorers;
            var player ="";
            posisi.forEach(element => {            
                var gol = element.numberOfGoals;
                const {name,nationality,position} = element.player;
                var tim = element.team.name;         
                player +=(`
              <tr>
               <td>${gol}</td>
               <td>${name}</td>
               <td>${position}</td>
               <td>${nationality}</td>
               <td>${tim}</td>
            
             </tr>
               `);
  
            });
  
            
            $('#topskor').html(player);
      
              
            });
          });
        }
      });
    }

  const topskor = async () => {
      try {
          const options = {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": "b6ad32fdee65494584a367eb4b648e90"
              }               
          }
        const response = await fetch(proxyurl+base_url+'competitions/SA/scorers',options);
        const responseJson = await response.json();
        if(responseJson.error) {
           showResponseMessage(responseJson.message);
        } else {
         $('#content').load("./src/content/topskor.html", function (response, status, request) {
            this; // dom element
          var posisi = responseJson.scorers;
          var player ="";
          posisi.forEach(element => {            
              var gol = element.numberOfGoals;
              const {name,nationality,position} = element.player;
              var tim = element.team.name;         
              player +=(`
            <tr>
             <td>${gol}</td>
             <td>${name}</td>
             <td>${position}</td>
             <td>${nationality}</td>
             <td>${tim}</td>
          
           </tr>
             `);

          });

          
          $('#topskor').html(player);
    
            
          });
          
     
        }
      } catch(error) {
         console.log(error);
      }
  }
  topskor();
}

function getJadwal() {
  

  if ("caches" in window) {
      caches.match(base_url+'competitions/SA/matches?matchday=27').then(function(response) {
        if (response) {
          response.json().then(function(data) {
              console.log(data);
              var articleHTML = `
                <h1>tes</h1>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("#content").innerHTML = articleHTML;
          });
        }
      });
    }

  const jadwal = async () => {
      try {
          const options = {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": "b6ad32fdee65494584a367eb4b648e90"
              }               
          }
        const response = await fetch(proxyurl+base_url+'competitions/SA/matches?matchday=27',options);
        const responseJson = await response.json();
        if(responseJson.error) {
           showResponseMessage(responseJson.message);
        } else {
          // console.log(responseJson.standings[0].table);
            $('#content').load("./src/content/jadwal.html", function (response, status, request) {
            this; // dom element
          var data = responseJson.matches;       
          var jadwal ="";
          data.forEach(element => {
            console.log(element);
            var home = element.homeTeam.name;            
            var away = element.awayTeam.name;
            var status = element.status;
            var skor = element.score.fullTime;
            if(status ==='POSTPONED'){
              status = 'Ditunda';
            }else{
              status = skor.awayTeam+' VS '+skor.homeTeam;
            }
            console.log(home,away,status,skor.awayTeam,skor.homeTeam);
            jadwal +=(`
            <tr>
             <td>${home}</td>
             <td>${status}</td>
             <td>${away}</td>       
          
           </tr>
             `);

          });
          
          $('#jadwal').html(jadwal)
    
            
          });
          
     
        }
      } catch(error) {
         console.log(error);
      }
  }
  jadwal();
}

function getTeam() {
  

  if ("caches" in window) {
      caches.match(base_url+'competitions/SA/teams').then(function(response) {
        if (response) {
          response.json().then(function(data) {
              console.log(data);
              var articleHTML = `
                <h1>tes</h1>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("#content").innerHTML = articleHTML;
          });
        }
      });
    }

  const tim = async () => {
      try {
          const options = {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": "b6ad32fdee65494584a367eb4b648e90"
              }               
          }
        const response = await fetch(proxyurl+base_url+'competitions/SA/teams',options);
        const responseJson = await response.json();
        if(responseJson.error) {
           showResponseMessage(responseJson.message);
        } else {
            $('#content').load("./src/content/tim.html", function (response, status, request) {
            this; // dom element
            console.log(responseJson.teams);
            
          var data = responseJson.teams;       
          var tim ="";
          data.forEach(element => {
            console.log(element);
            var logo = element.crestUrl;
             tim +=(`
             <a class="carousel-item"><img src="${logo}"></a>
             <script> 
  $('.carousel').carousel();

</script>
             `);

          });
          
          $('#tim').html(tim)
    
            
          });
          
     
        }
      } catch(error) {
         console.log(error);
      }
  }
  tim();
}
