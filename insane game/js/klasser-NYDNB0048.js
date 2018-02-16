"use strict"
class Spiller {
  constructor(x, y, bredde, hoyde, farge, hoyretast, venstretast, ztast, xtast, fart, skyteknapp, timerSkyt) {
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
  }

  tegn() {
    ctx.fillStyle = this.farge;
    ctx.fillRect(this.x, this.y, this.bredde, this.hoyde);
  }

  flytt() {
    this.x += this.fart;
    if(taster[this.venstretast] && this.x >= 5) {
      this.fart = -5;
    } else if (taster[this.hoyretast] && this.x <= canvas.width - this.bredde-5) {
      this.fart = 5;
    } else {
      this.fart = 0;
    }
  }

  skyt() {

    this.timerSkyt += 1;

    if(taster[this.skyteknapp] && this.timerSkyt % 15 == 0) {
      var nySkudd = new Skudd(this.x + this.bredde / 2, this.y - 3, 3, 0, -5, "red");
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
    if(this.hp == 1000 && kanonx[0] == boss.x + (boss.bredde/3)/2) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey");
      kanoner.push(kanon);
      return true;
    }
    else if(this.hp == 999 && kanonx[0] == boss.x + boss.bredde/2) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey");
      kanoner.push(kanon);
      return true;
    }
    else if(this.hp == 998 && kanonx[0] == (this.x + this.bredde) - this.bredde / 6) {
      var kanon = new Kanon(kanonx[0], this.y + this.hoyde/2, 20, "grey");
      kanoner.push(kanon);
      return true;
    }
  }
}


/////////////////////////////////////////////

class Skudd {
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

  treff(objekt) {
    var topp = this.y - 3;
    var venstre = this.x -3;
    var hoyre = this.x + 3;

    if ((topp < (objekt.y + objekt.hoyde)) && ((venstre < canvas.width - objekt.x) && (hoyre > objekt.x))) {
      return true;
    } else {
      return false;
    }
  }

}

///////////////////////


class Kanon {

  constructor(x, y, radius, farge) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.farge = farge;
  }

  tegn() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
    ctx.fillStyle = this.farge;
    ctx.fill();
  }

  hagle() {

      var kanonSkudd = new Kanonskudd(this.x, this.y, 5, 5, 0, "red");
      kanonSkuddListe.push(kanonSkudd);


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
    this.y += this.xfart;
    this.x += this.yfart;
  }
}
