

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


var spiller = new Spiller(canvas.width/2, canvas.height-70, 15, 15, "white", 39, 37, 122, 120, 0, 32, 0, 3, true);

var bossWidth = 400;
var boss = new Boss(canvas.width/2-bossWidth/2, 0, bossWidth, 40, "white", 500);
var flammeBoss = new FlammeBoss(240, 360, 200, 100, "orange", 30, true);


var hud = new Hud(0, canvas.height - 45, canvas.width, 45, "grey");
var hjerter = [];

//var hpEl = document.getElementById("hp");
//hpEl.innerHTML = "Boss health: " + boss.hp;

var spillerSkudd = [];

var kanonSkuddListe = []
var kanonx = [boss.x + boss.bredde/2, boss.x + (boss.bredde/3)/2, (boss.x + boss.bredde) - boss.bredde / 6];
var kanoner = [];


function spill() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hud.tegn();

  flammeBoss.tegn();
  flammeBoss.flytt(spiller);

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

    var random = Math.floor(Math.random() * 2);

    if(random == 0) {
      kanoner[i].spray();
    } else if(random == 1) {
      kanoner[i].hagle();
    }
  }

  for(var i = 0; i < kanonSkuddListe.length; i++) {

    kanonSkuddListe[i].flytt();
    kanonSkuddListe[i].tegn();
    kanonSkuddListe[i].veggTreff();

    if(kanonSkuddListe[i].treff(spiller)) {
      kanonSkuddListe.splice(i, 1);
      spiller.hp -= 1;
      console.log(spiller.hp);
      if(spiller.hp < 1) {
        spiller.lever = false;
      }
    }
    else if(kanonSkuddListe[i].uteAvSpill(hud)) {
      kanonSkuddListe.splice(i, 1);
    }
  }




  for (var i = 0; i < spillerSkudd.length; i++) {

    if (!(spillerSkudd[i].y < -7)) { //flytter bare på elementer som er innenfor canvas(eller  nesten)
      spillerSkudd[i].tegn();
      spillerSkudd[i].flytt();
      spillerSkudd[i].treffFlamme(flammeBoss);

      if(spillerSkudd[i].treff(boss)) {
        spillerSkudd.splice(i, 1);
        boss.hp -= 1;
      //  hpEl.innerHTML = "Boss health: " + boss.hp;
      }

    } else {
      spillerSkudd.splice(i, 1);
    }
  }


  hud.antallHjerter(spiller);

  for(var i = 0; i < hjerter.length; i++) {
    hjerter[i].tegn();
  }





  if(spiller.lever) {
    requestAnimationFrame(spill);
  }
}

requestAnimationFrame(spill);
