"use strict"
class Spiller {
  constructor(x, y, bredde, hoyde, farge, hoyretast, venstretast, ztast, xtast, fart, skyteknapp, timerSkyt, hp, lever) {
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.hoyde = hoyde;
    this.farge = farge;
    this.hoyretast = hoyretast;
    this.venstretast = venstretast;
    this.ztast = ztast;
    this.xtast = xtast;
    this.fart = fart;
    this.skyteknapp = skyteknapp;
    this.timerSkyt = timerSkyt;
    this.hp = hp;
    this.lever = lever;
  }

  tegn() {
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }

  flytt() {
    this.x += this.fart;
    if(taster[this.venstretast] && this.x > 0) {
      this.fart = -3;
    } else if (taster[this.hoyretast] && this.x < canvas.width - this.bredde) {
      this.fart = 3;
    } else {
      this.fart = 0;
    }
  }

  skyt() {

    this.timerSkyt += 1;

    if(taster[this.skyteknapp] && this.timerSkyt % 30 == 0) {
      var nySkudd = new Skudd(this.x + this.bredde / 2 - 0.5, this.y - 7, -6, 1, 7, "#00ff00");
      spillerSkudd.push(nySkudd);
    }
  }

  flash() {
    if(taster[this.ztast]) {
      this.x += 10;
    }
  }
}

/////////////////////////////////////////////////////

class Boss {
  constructor(x, y, bredde, hoyde, farge, hp) {
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.hoyde = hoyde;
    this.farge = farge;
    this.hp = hp;
  }

  tegn() {
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }

  spawnKanon() {
    if(this.hp == 500 && kanonx[0] == boss.x + boss.bredde/2) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey", 0);
      kanoner.push(kanon);
      return true;
    }
    else if(this.hp == 475 && kanonx[0] == boss.x + (boss.bredde/3)/2) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey", 0);
      kanoner.push(kanon);
      return true;
    }
    else if(this.hp == 450 && kanonx[0] == (this.x + this.bredde) - this.bredde / 6) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey", 0);
      kanoner.push(kanon);
      return true;
    }
  }
}


/////////////////////////////////////////////

class Skudd {
  constructor(x, y, yfart, bredde, hoyde, farge) {
    this.x = x;
    this.y = y;
    this.yfart = yfart;
    this.bredde = bredde;
    this.hoyde = hoyde;
    this.farge = farge;
  }

  tegn() {
    ctx.beginPath();
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }

  flytt() {
    this.y += this.yfart;
  }

  treff(objekt) {
    var hoyre = this.x + this.bredde;

    if ((this.y < (objekt.y + objekt.hoyde)) && ((this.x < canvas.width - objekt.x) && (hoyre > objekt.x))) {
      return true;
    } else {
      return false;
    }
  }

  treffFlamme(flammeBoss) {
    var y1 = flammeBoss.y + flammeBoss.hoyde;
    var x3 = flammeBoss.x1 + (flammeBoss.x2 - flammeBoss.x1) / 2;
    var z = x3 - flammeBoss.x1;
    var a = (y1 - flammeBoss.y) / z;

    var hoyre = this.x + this.bredde;
    var venstre = this.x;

    for (var i = 0; i <= z; i++) {
      var y2 = a * i + y1;

    }
  }

}

///////////////////////


class Kanon {

  constructor(x, y, radius, farge, timerSkyt) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.farge = farge;
    this.timerSkyt = timerSkyt;
  }

  tegn() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
    ctx.fillStyle = this.farge;
    ctx.fill();
  }

  hagle() {

      this.timerSkyt += 1;


      if(this.timerSkyt % 120 == 0) {//120
        var x = Math.random() * 4 + 3;
        var y = Math.sqrt(5 * 5 + x * x);

        var kanonSkudd = new Kanonskudd(this.x, this.y, 5, x * (-1), y, "red");
        kanonSkuddListe.push(kanonSkudd);

        var kanonSkudd = new Kanonskudd(this.x, this.y, 5, 0, 5, "red");
        kanonSkuddListe.push(kanonSkudd);

        var kanonSkudd = new Kanonskudd(this.x, this.y, 5, x, y, "red");
        kanonSkuddListe.push(kanonSkudd);

      }
  }

  spray() {
    this.timerSkyt += 1;

    if(this.timerSkyt % 40 == 0) {

      var x = Math.random() * 10 - 5;
      var y = Math.sqrt(5 * 5 + x * x);

      var kanonSkudd = new Kanonskudd(this.x, this.y, 5, x, y, "red");
      kanonSkuddListe.push(kanonSkudd);
    }
  }
}


///////////////////

class Kanonskudd {
  constructor(x, y, radius, xfart, yfart, farge) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xfart = xfart;
    this.yfart = yfart;
    this.farge = farge;
  }

  tegn() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.farge;
    ctx.fill();
  }

  flytt() {
    this.y += this.yfart;
    this.x += this.xfart;
  }

  veggTreff() {
    var venstre = this.x - this.radius;
    var hoyre = this.x + this.radius;

    if(venstre < 0 || hoyre > canvas.width) {
      this.xfart *= -1;
    }
  }

  treff(spiller) {

    var venstre = this.x - this.radius;
    var hoyre = this.x + this.radius;
    var topp = this.y - this.radius;
    var bunn = this.y + this.radius;

    if(topp < spiller.y + spiller.hoyde && bunn > spiller.y && venstre < spiller.x + spiller.bredde && hoyre > spiller.x) {
      return true;
    } else {
      return false;
    }
  }

  uteAvSpill(hud) {
    var bunn = this.y + this.radius;

    if(bunn > hud.y) {
      return true;
    } else {
      return false;
    }
  }
}



///////////////////////





class Hud {
  constructor(x, y, bredde, hoyde, farge) {
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.hoyde = hoyde;
    this.farge = farge;
  }

  tegn() {
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }

  antallHjerter(spiller) {

    hjerter.splice(0, hjerter.length);

    var x = 5;

    for(var i = 0; i < spiller.hp; i++) {
      var hjerte = new Hjerte(x, canvas.width - 37.5, 30, 30, "red");
      hjerter.push(hjerte);
      x += hjerter[i].bredde + 5;
    }
  }
}

class Hjerte {
  constructor(x, y, bredde, hoyde, farge) {
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.hoyde = hoyde;
    this.farge = farge;
  }

  tegn() {
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }
}

///////////&


class FlammeBoss {
  constructor(x1, x2, y, hoyde, farge, hp, xHoyre) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    this.hoyde = hoyde;
    this.farge = farge;
    this.hp = hp;
    this.xHoyre = xHoyre;
  }

  tegn() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y);
    ctx.lineTo(this.x2, this.y);
    ctx.lineTo(this.x1 + (this.x2 - this.x1) / 2, this.y + this.hoyde);
    ctx.closePath();

    ctx.fillStyle = this.farge;
    ctx.fill();
  }

  flytt(spiller) {

    var x3 = this.x1 + (this.x2 - this.x1) / 2;

    if(this.x1 <= x3 - 60) {
      this.xHoyre = true;
      console.log("dishdiajksnd");
    } else if(this.x1 >= x3 - 10) {
      this.xHoyre = false;

    }



    if(this.xHoyre) {
      this.x1 += 0.5;
      this.x2 -= 0.5;
    } else if(!this.xHoyre) {
      this.x1 -= 0.5;
      this.x2 += 0.5;
    }

    if (x3 < (spiller.x + spiller.bredde/2)) {
      this.x1 += 1;
      this.x2 += 1;
    } else if (x3 > (spiller.x + spiller.bredde/2)) {
      this.x1 -= 1;
      this.x2 -= 1;
  }


  }
}





atom-terminal;
terminal-plus:toggle;
