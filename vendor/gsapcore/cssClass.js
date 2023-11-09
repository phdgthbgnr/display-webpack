export default class CSS {
  static $(id) {
    const elem = null || document.getElementById(id);
    if (elem == null) console.log('%cERREUR : id "' + id + '" introuvable', 'color:#ff1d00;font-size:14px;font-weight:bold');
    return elem;
  }

  static ID_Class_exists(str) {
    const elem = document.querySelector(str);
    const isHorP = str[0] === '#' || str[0] === '.' ? true : false;
    if (elem !== null && isHorP == true) {
      var strs = str.substr(1);
      if (CSS.$(strs) !== null) {
        return 'id';
      }
      return 'class';
    }
    console.log('%cERREUR : "' + str + '" introuvable', 'color:#ff4e00');
    return false;
  }

  /**
   *
   * @param {*} id (id or class - #id / .class)
   * @param {*} className (class name .class)
   * @param {*} f -1 : class not present, 1 class present
   */

  static hasClass(id, className, f) {
    let node = null;
    switch (CSS.ID_Class_exists(id)) {
      case 'class':
        const nodes = document.querySelectorAll(id);
        // si la class n'existe pas -> false
        if (nodes.length == 0) return false;
        // retourne un tableau des objets ne contenant pas la class (dans le cas d'une selection (id) pavec une class)
        node = [];
        for (var i = 0; i < nodes.length; i++) {
          switch (f) {
            case -1:
              if ((' ' + nodes[i].className + ' ').indexOf(' ' + className + ' ') == -1) node.push(nodes[i]);
              break;
            case 1:
              if ((' ' + nodes[i].className + ' ').indexOf(' ' + className + ' ') > -1) node.push(nodes[i]);
              break;
          }
        }
        return node;
        break;
      case 'id':
        node = typeof id === 'object' ? id : CSS.$(id.substr(1));
        switch (f) {
          case -1:
            if (node) return (' ' + node.className + ' ').indexOf(' ' + className + ' ') == -1;
            break;
          case 1:
            if (node) return (' ' + node.className + ' ').indexOf(' ' + className + ' ') > -1;
            break;
        }
        break;
      default:
        return false;
    }
  }

  static addClass(id, className) {
    var e = CSS.hasClass(id, className, -1);
    if (e instanceof Array) {
      for (i = 0; i < e.length; i++) {
        e[i].classList ? e[i].classList.add(className) : (e[i].className += ' ' + className);
      }
    }
    if (e == true) {
      var o = CSS.$(id.substr(1));
      if (o) o.classList ? o.classList.add(className) : (o.className += ' ' + className);
    }
  }

  static removeClass(id, className) {
    var e = CSS.hasClass(id, className, 1);
    if (e instanceof Array) {
      for (i = 0; i < e.length; i++) {
        // self.Log(e[i].className)
        e[i].classList ? e[i].classList.remove(className) : (e[i].className = e[i].className.replace(className, ''));
      }
    }
    if (e == true) {
      var o = CSS.$(id.substr(1));
      if (o) o.classList ? o.classList.add(className) : (o.className += ' ' + className);
      if (o) {
        o.classList ? o.classList.remove(className) : o.className.replace(' ' + className, '').replace(className, '');
      }
    }
  }

  static removeClassFromNode(id, classe) {
    var node = typeof id === 'object' ? id : CSS.$(id);
    // if (typeof this.$dc(id).classList.remove === 'function'){
    if (node.classList) {
      node.classList.remove(classe);
    } else {
      node.className = node.className.replace(' ' + classe, '').replace(classe, '');
    }
  }
}
