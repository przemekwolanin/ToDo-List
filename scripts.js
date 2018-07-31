var listModule = (function(){
  var globalFunctions = {
    $: function(selector) {
      return document.querySelector(selector);
    },
    $$: function(selector) {
      return document.querySelectorAll(selector);
    },
    addHTML: function(elem) {
      return document.createElement(elem);
    },
    addAttr: function(selector,name,value) {
      return document.querySelector(selector).setAttribute(name,value);
    }
  }
  return {
    getGlobalFunctions: function() {
      return globalFunctions;
    }
  }
})();

var uiModule = (function(){
  var DOMstrings = {
    inputItem: '#add-new-item__inp',
    addItemBtn: '#add-new-item__btn',
    itemsList: '#items-list__list',
    itemElem: 'items-list__listelem',
    newListElement: 'items-list__listelem-',
    listElemTxt: 'listelem__text',
    listElemX: 'listelem__done'
  }
  return {
    getDOMstrings: function() {
      return DOMstrings;
    },
    getInput: function() {
      return {
        task: document.querySelector(DOMstrings.inputItem).value}
    }
  }
})();

var constrollerModule = (function(listCtrl, uiCtrl){
  var DOM, fns, idLelem, input;
  idLelem = 0;
  DOM = uiCtrl.getDOMstrings();
  fns = listCtrl.getGlobalFunctions();
  input = uiCtrl.getInput();

  var ctrlAddItem = function(event) {
    var elemParent, newElem, attributes, textElem, textElemValue;
    elemParent = fns.$(DOM.itemsList);
    newElem = fns.addHTML("LI");
    textElem = fns.addHTML("SPAN");
    textElemValue = input;

    elemParent.appendChild(newElem);
    newElem.setAttribute('id',DOM.newListElement+idLelem);
    newElem.setAttribute('class',DOM.itemElem);
    newElem.appendChild(textElem);
    textElem.setAttribute('class',DOM.listElemTxt);
    console.log(input.task);
    idLelem++;
  }

  var setupEventListeners = function() {
    fns.$(DOM.addItemBtn).addEventListener('click',function(event){
        event.preventDefault();
        ctrlAddItem();
    });
    document.addEventListener('keypress',function(event){
      if(event.keyCode === 13 || event.which === 13) { // ".which" for older browsers
        ctrlAddItem();
      }
    });
  }
  return {
    init: function() {
      console.log('Application has started.');
      DOM = uiCtrl.getDOMstrings();
      fns = listCtrl.getGlobalFunctions();
      setupEventListeners();
    }
  }

})(listModule, uiModule);

constrollerModule.init();
