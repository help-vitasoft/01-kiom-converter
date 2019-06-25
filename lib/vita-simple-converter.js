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
      var fileData=editor.getText();
      var filePath=editor.getPath();
	  var checkYml = filePath.indexOf(".yml");
	  var checkCon = filePath.indexOf("volume-contents.yml");
	  var cnvrtState = kiom.cnvrtState;
	  kiom.changeIdx=1;
	  if(checkYml == -1){
		  var idx=filePath.indexOf("contents");
		  filePath=filePath.substr(0,idx-1);
		  kiom.a=filePath+"\\contents\\volume-contents.yml";
		  kiom.b=filePath+"\\extractions\\meaning-classification.yml";
		  kiom.writeFile(kiom.a,"");
		  kiom.writeFile(kiom.b,"");
	      var data = fileData.split(/\(\(LV\)\)/g);
	      for(var i=0;i<data.length;i++){
	        kiom.init();
	        if(data[i].trim() != ""){
	           kiom.start(data[i]);
	           cnvrtState = kiom.cnvrtState;
	           if(cnvrtState){
	             kiom.out(i);
	           }else{
	             break;
	           }
	        }
	      }
	  }else{
		  kiom.a=filePath;
		  kiom.b=filePath;
		  kiom.writeFile(kiom.a,"");
		  kiom.writeFile(kiom.b,"");
		  var data = fileData.split(/(- contents_id\:)(.*)/g);
		  //fileData.split(/(- contents_id\: )(?!\w)/g);
		  for(var i=1;i<data.length;i++){
				kiom.addHashCode(data[i],checkCon)
		  }
		  cnvrtState = true;
	  }
      if(cnvrtState){
        alert("변환 끝");
      }else{
        alert("변환 실패");
      }
}
