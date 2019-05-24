'use babel';

import VitaSimpleConverterView from './vita-simple-converter-view';
import { CompositeDisposable } from 'atom';

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
    console.log('VitaSimpleConverter was toggled!!!!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
