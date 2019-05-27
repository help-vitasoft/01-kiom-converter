'use babel';

import VitaSimpleConverterView from './vita-simple-converter-view';
import { CompositeDisposable } from 'atom';
import kiom from './kiom'
export default {

  vitaSimpleConverterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vitaSimpleConverterView = new VitaSimpleConverterView(state.vitaSimpleConverterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vitaSimpleConverterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vita-simple-converter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vitaSimpleConverterView.destroy();
  },

  serialize() {
    return {
      vitaSimpleConverterViewState: this.vitaSimpleConverterView.serialize()
    };
  },

  toggle() {
        const editor = atom.workspace.getActiveTextEditor();
        var testFileData=editor.getText();
        //var testFileData = kiom.fileRead('C:/file/내경편1권.txt');
        var testData = testFileData.split(/\(\(LV\)\)/g);
        kiom.writeFile(kiom.a,"");
        kiom.writeFile(kiom.b,"");

        for(var i=0;i<testData.length;i++){
          kiom.init();
          if(testData[i].trim() != ""){
             kiom.start(testData[i]);
             kiom.out(i);
          }
        }
        kiom.error("끝");
  }
};
