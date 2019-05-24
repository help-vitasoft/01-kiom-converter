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
      var testFileData = kiom.fileRead('C:/file/내경편1권.txt');
      //var testFileData='((LV))	AA\n((OR))	我宣宗大王, 以理身之法, 推濟衆之仁, 留心醫學, 軫念民瘼. 嘗於丙申年間, 召太醫[sm/臣]許浚敎曰, 近見中朝方書, 皆是抄集庸𤨏, 不足觀爾, 宜裒聚諸方, 輯成一書. 且人之疾病, 皆生於不善調攝, 修養爲先, 藥石次之. 諸方浩繁, 務擇其要. 窮村僻巷無醫藥, 而夭折者多. 我國鄕藥多産, 而人不能知爾. 宜分類並書鄕名, 使民易知. 浚退與儒醫鄭碏, 太醫楊禮壽, 金應鐸, 李命源, 鄭禮男等, 設局撰集, 略成肯綮. 値丁酉之亂, 諸醫星散, 事遂寢. 厥後, 先王又敎許浚, 獨爲撰成, 仍出內藏方書五百卷以資考據. 撰未半而龍馭賓天. 至聖上卽位之三年庚戌, 浚始卒業而投進, 目之曰東醫寶鑑, 書凡二十五卷.\n((KO))	우리 선종대왕은 몸을 다스리는 법도를 대중을 구제하는 어진 마음으로 확장시켜 의학에 마음을 두시고 백성의 병을 걱정하셨습니다. 병신년(1596)에 태의(太醫) 허준을 불러 하교(下敎)하시기를, "근래에 중국의 의서를 보니 모두 조잡한 것을 초록하고 모은 것이어서 별로 볼만한 것이 없으니 여러 의서들을 모아 책을 편찬해야겠다. 사람의 질병은 모두 섭생을 잘 조절하지 못한데서 생기는 것이니 수양이 최선이고 약물은 그 다음이다. 여러 의서들은 번다하니 요점을 가리는데 힘쓰라. 궁벽한 고을에 치료할 의사와 약이 없어 요절하는 자가 많은데, 우리나라에서는 약재가 많이 산출되지만 사람들이 제대로 알지 못하니 종류별로 나누고 우리나라에서 부르는 명칭을 병기하여 백성들이 쉽게 알 수 있도록 하라"고 하셨습니다. 허준이 물러나와 유의(儒醫) 정작(鄭碏)ㆍ태의 양예수(楊禮壽)ㆍ김응탁(金應鐸)ㆍ이명원(李命源)ㆍ정예남(鄭禮男)과 관청을 설치하고 책을 편찬하여 대략 중요한 골격을 이루었는데, 정유재란을 만나 여러 의사들이 뿔뿔이 흩어져 일이 마침내 중단되었습니다. 그 후 선종대왕이 다시 허준에게 하교하여 홀로 책을 편찬하게 하시고 대궐에서 소장하고 있는 의서 오백권을 내어주어 고증하게 하셨는데 편찬 작업이 반도 끝나기 전에 선종대왕이 승하하셨습니다. 성상(聖上)이 즉위한 지 삼년이 된 경술년(1610)에 허준이 비로소 작업을 마치고 진상하면서 《동의보감》이라고 이름을 붙였으니 모두 25권입니다.\n((EN))	Our King Seonjo (宣祖 1552-1608) grieved of the people\'s pain and came to be concerned with medicine, in extension of his benevolent wish to relieve the people with methods for curing the body. Thus in the year of 1596 he called the royal physician of the Imperial Medical Office, Heo Jun (許浚), and said, "Recent Chinese books on medicine are all trifle stuff that are merely copies and not worth reading. All medical books ought to be gathered into one book. People\'s diseases all come from the inappropriate care of their health, so the subjects about cultivation should come first, and the subjects on herbs and acupuncture should come later. Most medical books are too vast and complex, so only the essentials shall be selected. The reason that many die prematurely in the rural provinces and secluded streets without doctors and medicine is because although local herbs are produced abundantly in our country, people do not know of them. So we have sorted out and recorded the names of local herbs so that the people may more easily know about them." Heo Jun, after hearing this, founded an organization with scholar physician Jeong Jak (鄭碏), court physician Yang Yesu (楊禮壽), Kim Eungtak (金應鐸), Lee Myeongwon (李命源), Jeong Yenam (鄭禮男), etc. , and started a compilation. But when they were about to build the framework, the second war with Japan (1597) broke out, and the work was dropped when all the doctors scattered. Afterwards, King Seonjo ordered Heo Jun to work again alone on it, and provided him with 500 medical books kept in the court to help him with the historical research. However, the king passed away when the project was not yet half completed. In the year of 1610, three years after King Gwanghae (光海君 1575-1641) ascended to the throne, Heo Jun finally finished his work and presented it to the king. The book was 25 volumes with the title of the Precious Mirror of Eastern Medicine (東醫寶鑑).\n[기타>인물설명/서적평가]	((許浚&鄭碏&楊禮壽&金應鐸&李命源&鄭禮男&東醫寶鑑))我宣宗大王, 以理身之法, 推濟衆之仁, 留心醫學, 軫念民瘼. 嘗於丙申年間, 召太醫[sm/臣]許浚敎曰, 近見中朝方書, 皆是抄集庸𤨏, 不足觀爾, 宜裒聚諸方, 輯成一書. 且人之疾病, 皆生於不善調攝, 修養爲先, 藥石次之. 諸方浩繁, 務擇其要. 窮村僻巷無醫藥, 而夭折者多. 我國鄕藥多産, 而人不能知爾. 宜分類並書鄕名, 使民易知. 浚退與儒醫鄭碏, 太醫楊禮壽, 金應鐸, 李命源, 鄭禮男等, 設局撰集, 略成肯綮. 値丁酉之亂, 諸醫星散, 事遂寢. 厥後, 先王又敎許浚, 獨爲撰成, 仍出內藏方書五百卷以資考據. 撰未半而龍馭賓天. 至聖上卽位之三年庚戌, 浚始卒業而投進, 目之曰東醫寶鑑, 書凡二十五卷.//전체 내용이 동의보감 편찬 과정에 대한 이야기이기에 의미분류에 집어넣음. 키워드에 허준과 기타 의가 추가함.\n[기타>경험의안/전설/일화]	((키워드_생략가능))\n((LV))	CC\n((OR))	脉法\n((KO))	맥법\n((EN))	Diagnosis by Pulse Taking\n((LV))	ZZ\n((OR))	趺陽脉浮而數, 浮則傷胃, 數則傷脾. 邪氣獨留心中卽飢, 邪熱不殺穀, 潮熱發渴.\n((KO))	부양맥(趺陽脉)이 부(浮)ㆍ삭(數)할 때 부한 것은 위(胃)를 상한 것이고, 삭한 것은 비(脾)를 상한 것이다. 사기(邪氣)가 가슴속에 머물면 배고프고, 사열(邪熱)이 곡식을 소화시키지 못하면 조열ㆍ갈증이 생긴다.\n    ((EN))	When the anterior tibial pulse is floating, it indicates a damaged stomach. When the anterior tibial pulse is rapid, it indicates a damaged spleen. When pathogenic qi resides in the chest, one gets hungry easily. When pathogenic heat causes food indigestion, dryness-heat and thirst occur.\n    [병증>병인]	((飢&潮熱&渴))邪氣獨留心中卽飢, 邪熱不殺穀, 潮熱發渴.\n    [병증>정의/설명/분류]	설명 ((飢&潮熱&渴))邪氣獨留心中卽飢, 邪熱不殺穀, 潮熱發渴.\n    [병증>진단/변증/감별]	진단 ((胃&脾))趺陽脉浮而數, 浮則傷胃, 數則傷脾.\n    [병증>예후/전변증]	((병증))\n    [병증>난치증/사증]	((병증_생략가능))';
      //var testContent = kiom.readTextFile("file:///D:/mediclassics/repo/M0120/contents/text/0차 원본파일/test1.txt");
      //console.log("2");
      var testData = testFileData.split(/\(\(LV\)\)/g);
      kiom.writeFile(kiom.a,"");
      kiom.writeFile(kiom.b,"");
      for(var i=0;i<testData.length;i++){
        //console.log(testData[i]);
        //console.log(testData[i].trim() != "");
        kiom.init();
        if(testData[i].trim() != ""){
            //console.log(testData[i]);

            kiom.start(testData[i]);


            kiom.out(i);
            //console.log(kiom);

        }

      }
      kiom.error("끝");
    }
};
