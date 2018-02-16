

var canvas = document.querySelector("#mittCanvas");
var ctx = canvas.getContext("2d");


var taster = [];

// Lytter etter keydown- og keyup-hendelser
window.addEventListener("keydown", knappnedopp);
window.addEventListener("keyup", knappnedopp);

// Når en knapp holdes nede, registreres den som true i arrayen taster, tilsvarende slettes den (settes til false)
// når den ikke lenger holdes nede
function knappnedopp(e) {
    if (e.type === "keydown") {
        taster[e.keyCode] = true;
    } else if (e.type === "keyup") {
        delete taster[e.keyCode];
    }
}


var spiller = new Spiller(canvas.width/2, canvas.height-60, 15, 15, "white", 39, 37, 122, 120, 0, 32, 0);

var bossWidth = 400;
var boss = new Boss(canvas.width/2-bossWidth/2, 0, bossWidth, 40, "white", 1000);

//var hpEl = document.getElementById("hp");
//hpEl.innerHTML = "Boss health: " + boss.hp;

var spillerSkudd = [];

var kanonSkuddListe = []
var kanonx = [boss.x + (boss.bredde/3)/2, boss.x + boss.bredde/2, (boss.x + boss.bredde) - boss.bredde / 6];
var kanoner = [];


function spill() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spiller.flytt();
  spiller.tegn();
  spiller.skyt();
  boss.tegn();

  if(boss.spawnKanon()) {
    kanonx.splice(0, 1);
    console.log(kanonx);
  }

  for(var i = 0; i < kanoner.length; i++) {
    kanoner[i].tegn();
    kanoner[i].hagle();
  }

  for(var i = 0; kanonSkuddListe.length; i++) {
    kanonSkuddListe[0].tegn();
    kanonSkuddListe[0].flytt();
  }




  for (var i = 0; i < spillerSkudd.length; i++) {

    if (!(spillerSkudd[i].y < -7)) { //flytter bare på elementer som er innenfor canvas(eller  nesten)
      spillerSkudd[i].tegn();
      spillerSkudd[i].flytt();

      if(spillerSkudd[i].treff(boss)) {
        spillerSkudd.splice(i, 1);
        boss.hp -= 1;
      //  hpEl.innerHTML = "Boss health: " + boss.hp;
      }

    } else {
      spillerSkudd.splice(i, 1);
    }
  }






  requestAnimationFrame(spill);

}

requestAnimationFrame(spill);
