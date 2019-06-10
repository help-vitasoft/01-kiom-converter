'use babel';
import SHA256 from './SHA256';
export default {
    src : [],
    LV : "",
    OR : "",
    KO : "",
    EN : "",
    tagName : "",
    className : "",
    other : {"general":[]},
    ann : {},
    image : "",
    a: "",
    b: "",
    exTagName: "",
    cvrtState: true,
    changeIdx:1,
    init(){
      this.src=null,
      this.LV="";
      this.OR="";
      this.KO="";
      this.EN="";
      this.tagName="";
      this.className="";
      this.other={"general":[]};
      this.ann=[];
      this.image="";
      this.cnvrtState= true;
      //this.changeIdx=1;
    },
    start(content) {

      this.src = content.split(/\r\n|\r|\n/g);
      this.removeEmptyLine();
      this.removeNewLine();

      this.setLV();

      if(this.LV.match(/[A-Z0-9]{2}/g) == null){
        alert("올바른 컨텐츠가 아닙니다.");
        this.cnvrtState= false;
      }else{
        this.getTagName();
        this.getTagChage();
        this.getClassName();
        switch(this.getLV()){
          case "PP"://image
            this.getImageOR();
            this.getImageKO();
            this.getImageEN();
            break;
          case "TT"://image
            this.getTableOR();
            this.getTableKO();
            this.getTableEN();
            break;
          default:
            this.getOR();
            this.getKO();
            this.getEN();
            this.getOther();
        }
      }

    },
    changeAnn(str,type){
      // var pattern = /((?:(?!\s).)*)\{(.*?)\s?[:=]\s?(.*?)\}/gi;
      var pattern = /\{(.*?)\s?[:=]\s?(.*?)\}/gi;
      var matchArray = str.match(pattern);
      if(matchArray != null) {
        for(var i=0; i<matchArray.length; i++) {

          var key = matchArray[i].replace(pattern,"$1");
		  console.log(key);
          if(key == ""){
              var newPattern = /\{()([:=](?:(?!\}).)*)\}/gi;
			  var newTxt = matchArray[i].replace(newPattern, "{"+this.changeIdx+"$2}");
			  console.log(newTxt);
              if(type == "OR"){
                str=str.replace(matchArray[i],newTxt);
              }else if(type == "KO"){
                str=str.replace(matchArray[i],newTxt);
              }else{
                str=str.replace(matchArray[i],newTxt);
              }
              key+=this.changeIdx;
              this.changeIdx++;
          }
          var val = matchArray[i].replace(pattern,"$2");
		  var data={};
		  data[key]=val;
          this.ann.push(data);
        }
      }
      var newPattern2=/\{([1-9].*?)\s?[:=]\s?(.*?)\}/gi;
      str=str.replace(newPattern2, "[^$1]");

      var newPattern3=/\{((?![1-9]).*?)\s?[:=]\s?(.*?)\}/gi;

      return str.replace(newPattern3, "$1[^$1]");
    },
    changeColon(str){
		str=str.replace(/\:$/gi,"");
      return str.replace(/(\s+)?(\:)(\s+)?/gi, ":");;
    },
    changeImage(str){
      var pattern=/\<(.+?)(,(.*))?\>(.*)/gi;
    	var arr = str.match(pattern);
      var str1 = str.replace(pattern,"$1");
      var str2 = str.replace(pattern,"$3");
      var str3 = str.replace(pattern,"$4");
      if(str1){
        arr.push(str1);
      }else{
        arr.push("");
      };
      if(str2){
        arr.push(str2)
      }else{
        arr.push("");
      };
      if(str3){
        arr.push(str3)
      }else{
        arr.push("");
      };
    	return arr;
    },
    changeNewLine(str){
      return str.replace(/{n}/gi, " ");
    },
    changeQuot(str){
      try{
        str=str.replace(/'/gi, "＂");
        str=str.replace(/"/gi, "＂");
      }catch(e){
        //this.error(str);
      }
    	return str;
    },
    changeSm(str){
      var pattern=/\[sm\/((?:(?!\]).)*)\]/gi;
      return str.replace(pattern, "<small>$1</small>");
    },
    changeIp(str){
    	var pattern=/\[ip\/((?:(?!\]).)*)\]/gi;
    	return str.replace(pattern, "<ip>$1</ip>");
    },
    changeLg(str){
    	var pattern=/\[lg\/((?:(?!\]).)*)\]/gi;
      return str.replace(pattern, "<lg>$1</lg>");
    },
    changePs(str){
      var pattern=/\[ps\/((?:(?!\]).)*)\]/gi;
      return str.replace(pattern, "<ps>$1</ps>");
    },
    changeNg(str){
      var pattern=/\[ng\/((?:(?!\]).)*)\]/gi;
      return str.replace(pattern, "<ng>$1</ng>");
    },
    changeTable(str){
      //{n}# -->\n
      var res = '';
      res = str.replace(/##/gi, '');
      res = res.replace(/{n}#/gi, '\n    ');
      res = res.replace(/#/gi, '\t');
      res = res.replace(/{n}/gi, '\n    ');
      res = "|\n    "+res;
      return res;
    },
    changeText(str,type){
      if(str){
      	str=this.changeQuot(str);
    	str=this.changeColon(str);
    	str=this.changeNewLine(str);
    	str=this.changeSm(str);
    	str=this.changeIp(str);
    	str=this.changeLg(str);
    	str=this.changePs(str);
    	str=this.changeNg(str);
    	str=this.changeAnn(str,type);
    }else{
      str="";
    }
    	return str;
    },
    error(str){
        console.log(str);
    },
    getClassName(){
      switch(this.LV){
          case "AA":
          case "BB":
          case "CC":
          case "DD":
          case "OO":
          case "EE":
          case "FF":
          case "ZZ":
              this.className="";
              break;
          case "BH":
          case "CH":
          case "DH":
          case "EH":
          case "FH":
              this.className='["herb"]';
              break;
          case "BP":
          case "CP":
          case "DP":
          case "EP":
          case "FP":
          case "SS":
              this.className='["px"]';
              break;
          case "BK":
          case "CK":
          case "DK":
          case "EK":
          case "FK":
              this.className='["acpt"]';
              break;
          case "Z0":
              this.className='["indent0"]';
              break;
          case "Z1":
              this.className='["indent1"]';
              break;
          case "Z2":

              this.className='["indent2"]';
              break;
          case "Z3":
              this.className='["indent3"]';
              break;
          case "S0":
              this.className='["px", "indent0"]';
              break;
          case "S1":
              this.className='["px", "indent1"]';
              break;
          case "S2":
              this.className='["px", "indent2"]';
              break;
          case "S3":
              this.className='["px", "indent3"]';
              break;
          case "XX":
          case "YY":
              this.className='["desc"]';
              break;
          case "PP":
              this.className='["caption", "title"]';
              break;
          case "TT":
              this.className='["table-header"]';
              break;
          default:
      }
    },
    getEN(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((EN))\t");
        this.EN=arr[1];
        if(arr[1]){
          this.removeLine("0");
        }
      }
    },
    getImageEN(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((EN))\t");
        if(arr[1]){
          this.image=this.changeImage(arr[1]);
          this.EN=this.image[2];
          //this.image['alt']["ALT_OR"]=this.image[3][0];
          this.image['src']=this.image[1];
          this.removeLine("0");
        }
      }
    },
    getImageKO(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((KO))\t");
        if(arr[1]){
          this.image=this.changeImage(arr[1]);
          this.KO=this.image[2];
          //this.image['alt']["ALT_OR"]=this.image[3][0];
          this.image['src']=this.image[1];
          this.removeLine("0");
        }
      }
    },
    getImageOR(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((OR))\t");
        if(arr[1]){
          this.image=this.changeImage(arr[1]);
          this.OR=this.image[2];
          //this.image['alt']["ALT_OR"]=this.image[3][0];
          this.image['src']=this.image[1];
          this.removeLine("0");
        }
      }
    },
    divKeyword(str){
      return str.split("&");
    },
    divValue(str){
      return str.split("&");
    },
    getKeyword(str){
      var pattern=/\(\((.*)\)\)/g;
      var arr = str.match(pattern);
      if(arr){
        var keyword= arr[0].replace(pattern,"$1");
        var arrKeyword = this.divKeyword(keyword);
        //中風&痰響
      }else{
        var arrKeyword=[];
      }
      //$keyword=preg_replace($pattern, "\\1", $arr[0][0]);
      var value=str.replace(pattern,"");
      if(value){
        var value2=this.divValue(value);
      }else{
        var arrKeyword=[];
        var value2=[];
      }
      return [arrKeyword,value2];
    },
    getKO(){

      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((KO))\t");
        this.KO=arr[1];
        if(arr[1]){
          this.removeLine("0");
        }
      }
    },
    getLevel(content){

    },
    getLV(){
      return this.LV;
    },
    getOR(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((OR))\t");
        this.OR=arr[1];
        if(arr[1]){
          this.removeLine("0");
        }
      }
    },
    /*
  	**	value 에 실제 써야 할 키가 같이 전송 되므로 해당 키를 뽑아서 키세팅을 하고 키는 삭제
  	**	최종적으로 key를 리턴
  	**	1. 첫단어 뽑기
  	**	2. 첫단어가 키인지 확인
  	*/
  	extractKey(value){
  		value=value.trim();
  		var newKey="";
  		var arr=value.split(' ');
  		newKey=arr[0];
  		if(!this.isRealKey(newKey)){
  			newKey="";
  		}
  		return newKey;
  	},
  	/*
  	**	받은 키가 실제 키로 사용되는지의 여부를 확인
  	*/
  	isRealKey(newKey){
  		var key=false;
  		switch(newKey){
  			case "혈위":
  				key=true;
  				break;
        case "취혈":
  				key=true;
  				break;
        case "자극":
          key=true;
          break;
        case "보사":
          key=true;
          break;
        case "수기":
          key=true;
          break;
        case "제법용법":
          key=true;
          break;
        case "추가처치":
          key=true;
          break;
        case "효능":
          key=true;
          break;
        case "반응":
          key=true;
          break;
        case "기대효과":
          key=true;
          break;
        case "금기":
          key=true;
          break;
        case "주의":
          key=true;
          break;
        case "부작용":
          key=true;
          break;
        case "인물설명":
          key=true;
          break;
        case "서적평가":
          key=true;
          break;
        case "경험의안":
          key=true;
          break;
        case "전설":
          key=true;
          break;
        case "일화":
          key=true;
          break;
        case "정의":
          key=true;
          break;
        case "설명":
          key=true;
          break;
        case "분류":
          key=true;
          break;
        case "진단":
          key=true;
          break;
        case "변증":
          key=true;
          break;
        case "감별":
          key=true;
          break;
        case "예후":
          key=true;
          break;
        case "전변증":
          key=true;
          break;
        case "난치증":
          key=true;
          break;
        case "사증":
          key=true;
          break;
        case "약성":
          key=true;
          break;
        case "효능":
          key=true;
          break;
        case "기원":
          key=true;
          break;
        case "식생":
          key=true;
          break;
        case "형상":
          key=true;
          break;
        case "감별":
          key=true;
          break;
        case "채취":
          key=true;
          break;
        case "보관":
          key=true;
          break;
        case "약용부위":
          key=true;
          break;
        case "수치포자":
          key=true;
          break;
        case "상수상반":
          key=true;
          break;
        case "배오효과":
          key=true;
          break;
  			default:
  		}
  		return key;
  	},
  	/*
  	**	key,value를 받아서 value에서 키를 삭제
  	**	return value
  	*/
  	removeKey(key,value){
  		return value.replace(key,"").trim();
  	},
    getOther(){
      for(var i=0;i<this.src.length;i++){
          if(this.src[i]){
              var arr = this.src[i].split("\t");
              var key = arr[0].replace(/[\[\]]/g, "");
              var arryKey = key.split(">");
              if(arr.length>1){
                  var keywordArray=this.getKeyword(arr[1]);
              }else{
                  var keywordArray=[];
              }
              try{
                  for(var j=0;j<keywordArray.length;j++){
                    if(keywordArray[1][j]){
                      keywordArray[1][j]=this.changeSm(keywordArray[1][j]);
                      keywordArray[1][j]=this.changeIp(keywordArray[1][j]);
                      keywordArray[1][j]=this.changeLg(keywordArray[1][j]);
                      keywordArray[1][j]=this.changePs(keywordArray[1][j]);
                      keywordArray[1][j]=this.changeNg(keywordArray[1][j]);
                    }
                  }
                  //keywordArray[1] 첫단어가 키가 되므로 빼내야 됨
                  var realKey=this.extractKey(keywordArray[1][0]);
                  if(realKey){
                    if(!arryKey[2]){
                      arryKey[1]=realKey;
                    }else{
                      arryKey[2]=realKey;
                    }

                    keywordArray[1][0]=this.removeKey(realKey,keywordArray[1][0]);
                  }
                  switch(arryKey[0]){
                    case "본초":
                        this.setHerbs(arryKey,keywordArray);
                        break;
                    case "병증":
                        this.setGeneral(arryKey,keywordArray);
                        break;
                    case "기타":
                        this.setEtc(arryKey,keywordArray);
                        break;
                    case "방제":
                        this.setPrescription(arryKey,keywordArray);
                        break;
                    case "경혈":
                        this.setAcupoint(arryKey,keywordArray);
                        break;
                    case "치료":
                        this.setCure(arryKey,keywordArray);
                        break;
                    default:
                }
              }catch(e){
                  //this.error(keywordArray);
              }
          }
      }
    },
    getTableEN(){
      if(this.src[0]){
        var arr=this.src[0].split("((EN))\t");
        if(arr[1]){
          this.EN=this.changeTable(arr[1]);
          this.removeLine("0");
        }
       }
    },
    getTableKO(){
      if(this.src[0]){
      var arr=this.src[0].split("((KO))\t");
      if(arr[1]){
        this.KO=this.changeTable(arr[1]);
        this.removeLine("0");
      }
      }
    },
    getTableOR(){
      if(this.src[0]){
      var arr=this.src[0].split("((OR))\t");
      if(arr[1]){
        this.OR=this.changeTable(arr[1]);
        this.removeLine("0");
      }
    }
    },
    getTagName(){
      var tagname="";
      switch(this.LV){
            case "AA":
                tagname="h1";
                break;
            case "OO":
            case "BB":
            case "BH":
            case "BP":
            case "BK":
                tagname="h2";
                break;
            case "CC":
            case "CH":
            case "CP":
            case "CK":
                tagname="h3";
                break;
            case "DD":
            case "DH":
            case "DP":
            case "DK":
                tagname="h4";
                break;
            case "EE":
            case "EH":
            case "EP":
            case "EK":
                tagname="h5";
                break;
            case "FF":
            case "FH":
            case "FP":
            case "FK":
                tagname="h6";
                break;
            case "ZZ":
            case "Z0":
            case "Z1":
            case "Z2":
            case "Z3":
                tagname="p3";
                break;
            case "S0":
            case "S1":
            case "S2":
            case "S3":
            case "SS":
                tagname="p4";
                break;
            case "XX":
                tagname="p1";
                break;
            case "YY":
                tagname="py";
                break;
            case "PP"://(이미지 파일 제목 및 포함된 글자)
                tagname="img";
                break;
                /*          case "PP"://(이미지 파일) 사용하지 않음
                 $tagname="img";
                 break;
                 */
            case "TT":
                tagname="table";
                break;
            default:
                tagname="";
        }
        this.tagName=tagname;
        this.exTagName=tagname;
    },
    getTagChage(){
      var extagname=this.exTagName;
      if(extagname.indexOf("h") != -1){
          var str = extagname.indexOf("h");
          var idx = extagname.substr(str+1,1);
          pTag="p"+idx;
          imgTag="img"+idx;
          table="table"+idx;
      }
      if(extagname.indexOf("h") == -1 && extagname.indexOf("p") != -1){
        this.tagName = pTag;
      }
      if(extagname.indexOf("h") == -1 && extagname.indexOf("img") != -1){
        this.tagName = imgTag;
      }
      if(extagname.indexOf("h") == -1 && extagname.indexOf("table") != -1){
        this.tagName = table;
      }
    },
    //kiom.fileRead('D:\\text.txt');
    fileRead(filePath){
      var fs = require('fs');
      var text = fs.readFileSync(filePath, 'utf8');
      return text;

    },
    //kiom.fileWrite('D:\\text2.txt',str);
    writeFile(filePath,data){
      var fs = require('fs');
      fs.writeFileSync(filePath, data, 'utf8');
    //console.log("파일 생성 완료");
    },
    appendFile(filePath,data){
      var fs = require('fs');
      fs.appendFileSync(filePath, data, 'utf8');
      //console.log("파일 생성 완료");
    },
    outImg(str,idx){
      var hash = this.getSha256(idx+"img");
      str.push('- contents_id: '+hash);
      str.push('  tagname: '+this.outValue(this.tagName));
      image="IMG: ";
      image+="<" +this.image['src']+">\n";
      str.push("  "+image.trim());
      str.push("");
      return str
    },
    out(idx){
          var str = [];
          var hash = this.getSha256(idx);
          if(this.getLV() == "PP"){
            str=this.outImg(str,idx);
            this.tagName = "p"+this.tagName.substr(3);
          }
          if(this.OR || this.KO || this.EN){
            str.push('- contents_id: '+hash);
            str.push('  tagname: '+this.outValue(this.tagName));
            if(this.className) str.push('  class: '+this.className.trim());

            if(this.OR) str.push('  OR: ' + this.outValue(this.OR,"OR"));
            if(this.KO) str.push('  KO: '+this.outValue(this.KO,"KO"));
            if(this.EN) str.push('  EN: '+this.outValue(this.EN,"EN"));
            //str.push('');
            if(this.ann.length>0){
            	ann="NOTE:\n";
            	var cnt=0;
              for(var i=0;i<this.ann.length;i++) {
                if(cnt == 0) {ann+="    ";}
                else {ann+="    ";}
				var data=this.ann[i];
				var key=Object.keys(data);
				var value=data[key]
                ann+="- [^"+key+"]: "+value+"\n";
              	cnt++;
              }
            	str.push("  "+ann.trim()+"");
            }
            //str.push('');
            str.push('');
          }
          str.push('');
          this.appendFile(this.a,str.join("\n"));

          var str2 = [];
          if(this.other){

            for(var key in this.other) {
              //key = "accupoint";
              //str.push('');
              for(var k1 in this.other[key]) {
                //k1=general
                //str2.push('');

                str2.push('- contents_id: '+hash);
                str2.push('  '+key+': ');//치료
                for(var k2 in this.other[key][k1]) {
                  str2.push('    '+k2+': ');//대상
                  for(var k3 in this.other[key][k1][k2]) {

                    if(Object.keys(this.other[key][k1][k2][k3]).length>0) {
                      values="[";

                      for(var i=0;i<Object.keys(this.other[key][k1][k2][k3]).length;i++) {
                        //console.log(this.other[key][k1][k2]);
                        var val = this.other[key][k1][k2][k3][i];
                        if(values != "[") values+=",";
                        values+=val.trim();
                      }
                      str2.push('      '+k3+': '+values+"]");
                    } else {
                      if(k1=="cure") {
                        str2.push('      '+k3+': ');
                      }
                    }
                  }
                }
                str2.push('');
              }
            }

            str2.push('');
          }

          this.appendFile(this.b,str2.join("\n"));
          //return str;
        },

        outValue(str,type){
          switch(this.getLV()){
            case "PP":
            case "TT":
              break;
            default:
              str = this.changeText(str,type);
          }
          return str.trim();
        },

    removeLine(idx){
      this.src.splice(idx,1);
    },
    //빈줄제거
    removeEmptyLine(){
       for(var i=0; i<this.src.length; i++){
          var row=this.src[i];
          if(row.trim() == "" || row.trim() == undefined || row.trim() == null || row.trim() == "\n"){
             this.src.splice(i,1);
             i--;
          }
       }
    },
    /*
    **   ((.*)), [.*>.*] 가 없는 내용은 전줄과 합침
    */
    removeNewLine(){
       for(var i=0; i<this.src.length; i++){
          var row=this.src[i];

          if(!row.match(/[A-Z]{2}/) && !row.match(/\(\(.*\)\)/) && !row.match(/\[.*\>.*\]/)){
             var before=this.src[i-1];
             before += " "+row;
             this.src[i-1]=before;
          }
       }
    },
    setAcupoint(arrayKey,keywordArray){
      if(!this.other['general']['acupoint']){
            var arrKWD =
                {"acupoint":
                  {
                    "acupoint_keyword":[]
                    ,"acupoint_acupoint":[]
                    ,"acupoint_chwiyeol":[]
                    ,"acupoint_stimulus":[]
                    ,"acupoint_requital":[]
                    ,"acupoint_manipulation":[]
                  }
                };
        }else{
          var arrKWD=this.other['general']['acupoint'];
        }
        switch(arrayKey[1]){
          case "경혈_키워드":
    			   var key="acupoint_keyword";
    			break;
      		case "혈위":
      		case "혈위/취혈":
      			var key="acupoint_acupoint";
      			break;
      		case "취혈":
      			var key="acupoint_chwiyeol";
      			break;
      		case "자극":
      		case "자극/보사/수기":
      			var key="acupoint_stimulus";
      			break;
      		case "보사":
      			var key="acupoint_requital";
      			break;
      		case "수기":
      			var key="acupoint_manipulation";
      			break;
      		default:
    			  var key="미분류";
        }
        this.setArrKWD(arrKWD,keywordArray,key,"acupoint","acupoint_keyword");
    },

    setCure(arrayKey,keywordArray){
      if(!this.other['cure']){
            var arrKWD =
              {"cure":
                {
                  "target":{
                    "cure_keyword":[]
                    ,"cure_target":[]
                  }
                  ,"therapy":
                  {
                    "therapy_keyword":[]
                    ,"therapy_method":[]
                    ,"therapy_usage":[]
                    ,"therapy_handle":[]
                    ,"therapy_virtue":[]
                    ,"therapy_reaction":[]
                    ,"therapy_effect":[]
                    ,"therapy_taboo":[]
                    ,"therapy_caution":[]
                    ,"therapy_sideeffect":[]
                    ,"therapy_adjust":[]
                  }
                }
              };
        }else{
          var arrKWD=this.other['cure'];
        }
        var key1=arrayKey[1];
      	if(!arrayKey[2]){
      		switch(arrayKey[1]){
      			case "대상":
      				var key1="target";
      				var key2="cure_target";
      				var keyword="cure_keyword";
      				break;
      			case "방법":
      				var key1="therapy";
      				var key2="therapy_method";
      				var keyword="therapy_keyword";
      				break;
      			default:
      				this.error("분류되지 않은 키.",arrayKey);
      		}
      	}else{
      		var key2=arrayKey[2];
      		switch(arrayKey[1]){
      			case "대상":
      				var key1="target";
      				var keyword="cure_keyword";
      				break;
      			case "방법":
      				var key1="therapy";
      				var keyword="therapy_keyword";
      				break;
      			default:
      				this.error("분류되지 않은 키.",arrayKey);
      		}
      		switch(key2){
  	    		case "치료대상키워드":
  	    			var key2="cure_keyword";
  	    			break;
  	    		case "치료대상":
  	    			var key2="cure_target";
  	    			break;
  	    		case "치료방법키워드":
  	    			var key2="therapy_keyword";
  	    			break;
  	    		case "치료방법":
  	    			var key2="therapy_method";
  	    			break;
  	    		case "제법용법":
  	    		case "제법용법/추가처치":
  	    			var key2="therapy_usage";
  	    			break;
  	    		case "추가처치":
  	    			var key2="therapy_handle";
  	    			break;
  	    		case "효능":
  	    		case "효능/반응/기대효과":
  	    			var key2="therapy_virtue";
  	    			break;
  	    		case "반응":
  	    			var key2="therapy_reaction";
  	    			break;
  	    		case "기대효과":
  	    			var key2="therapy_effect";
  	    			break;
  	    		case "금기":
  	    		case "금기/주의/부작용":
  	    			var key2="therapy_taboo";
  	    			break;
  	    		case "주의":
  	    			var key2="therapy_caution";
  	    			break;
  	    		case "부작용":
  	    			var key2="therapy_sideeffect";
  	    			break;
  	    		case "가감":
  	    			var key2="therapy_adjust";
  	    			break;
  	    		default:
  	    			var key2="미분류";
  	    	}
      	}
        if(keywordArray){

              if(keywordArray[1].length>0){
                  for(var i=0;i<keywordArray[1].length;i++){
                    if(keywordArray[1][i].trim()){
                      arrKWD['cure'][key1][key2].push("\""+keywordArray[1][i]+"\"");
                    }
                }
              }
      		    //arrKWD['cure'][key1][key2].push("\""+keywordArray[1]+"\"");
      		    if(keywordArray[0].length>0){
                  for(var i=0;i<keywordArray[0].length;i++){
                    if(keywordArray[0][i].trim() !=""){
                    arrKWD['cure'][key1][keyword].push("\""+keywordArray[0][i]+"\"");
                  }
                }
              }
        }
      	this.other['cure']=arrKWD;
    },
    setEtc(arrayKey,keywordArray){
      if(!this.other['general']['etc']){
            var arrKWD =
                {"etc":
                  {
                    "etc_keyword":[]
                    ,"etc_account":[]
                    ,"etc_books":[]
                    ,"etc_appraisal":[]
                    ,"etc_experience":[]
                    ,"etc_legend":[]
                    ,"etc_anecdote":[]
                  }
                };
        }else{
          var arrKWD=this.other['general']['etc'];
        }
        switch(arrayKey[1]){
        	case "인물_키워드":
        		var key="etc_keyword";
        		break;
        	case "인물설명":
        	case "인물설명/서적평가":
        		var key="etc_account";
        		break;
        	case "서적_키워드":
        		var key="etc_books";
        		break;
        	case "서적평가":
        		var key="etc_appraisal";
        		break;
        	case "경험의안":
        	case "경험의안/전설/일화":
        		var key="etc_experience";
        		break;
        	case "전설":
        		var key="etc_legend";
        		break;
        	case "일화":
        		var key="etc_anecdote";
        		break;
        	default:
        		var key="미분류";
        }

        this.setArrKWD(arrKWD,keywordArray,key,"etc","etc_keyword");
    },

    setGeneral(arrayKey,keywordArray){
      if(!this.other['general']['disease']){
            var arrKWD =
                {"disease":
                  {
                    "disease_keyword":[]
                    ,"disease_etiology":[]
                    ,"disease_definition":[]
                    ,"disease_account":[]
                    ,"disease_classify":[]
                    ,"disease_diagnosis":[]
                    ,"disease_steatorrhea":[]
                    ,"disease_identifying":[]
                    ,"disease_prognosis":[]
                    ,"disease_mutate":[]
                    ,"disease_obstinacy":[]
                    ,"disease_visa":[]
                  }
                };
        }else{
          var arrKWD=this.other['general']['disease'];
        }
        switch(arrayKey[1]){
          case "병증_키워드":
        		var key="disease_keyword";
        		break;
        	case "병인":
        		var key="disease_etiology";
        		break;
        	case "정의":
        	case "정의/설명/분류":
        		var key="disease_definition";
        		break;
        	case "설명":
        		var key="disease_account";
        		break;
        	case "분류":
        		var key="disease_classify";
        		break;
        	case "진단":
        	case "진단/변증/감별":
        		var key="disease_diagnosis";
        		break;
        	case "변증":
        		var key="disease_steatorrhea";
        		break;
        	case "감별":
        		var key="disease_identifying";
        		break;
        	case "예후":
        	case "예후/전변증":
        		var key="disease_prognosis";
        		break;
        	case "전변증":
        		var key="disease_mutate";
        		break;
        	case "난치증":
        	case "난치증/사증":
        		var key="disease_obstinacy";
        		break;
        	case "사증":
        		var key="disease_visa";
        		break;
        	default:
        		var key="미분류";
        }

        this.setArrKWD(arrKWD,keywordArray,key,"disease","disease_keyword");
    },

    setHerbs(arrayKey,keywordArray){
      if(!this.other["general"]['herbs']){
            var arrKWD =
                {"herbs":
                  {
                    "herbs_keyword":[]
                    ,"herbs_mitis":[]
                    ,"herbs_effect":[]
                    ,"herbs_origin":[]
                    ,"herbs_vegetation":[]
                    ,"herbs_flguration":[]
                    ,"herbs_sifting":[]
                    ,"herbs_collect":[]
                    ,"herbs_storage":[]
                    ,"herbs_region":[]
                    ,"herbs_spore":[]
                    ,"herbs_plate":[]
                    ,"herbs_beo":[]
                  }
                };
        }else{
          var arrKWD=this.other["general"]['herbs'];
        }
        switch(arrayKey[1]){
          case "본초_키워드":
            var key="herbs_keyword";
            break;
          case "약성":
          case "약성/효능":
            var key="herbs_mitis";
            break;
          case "효능":
            var key="herbs_effect";
            break;
          case "기원":
          case "기원/식생/형상/감별":
            var key="herbs_origin";
            break;
          case "식생":
            var key="herbs_vegetation";
            break;
          case "형상":
            var key="herbs_flguration";
            break;
          case "감별":
            var key="herbs_sifting";
            break;
          case "채취":
          case "채취/보관":
            var key="herbs_collect";
            break;
          case "보관":
            var key="herbs_storage";
            break;
          case "약용부위":
          case "약용부위/수치포자":
            var key="herbs_region";
            break;
          case "수치포자":
            var key="herbs_spore";
            break;
          case "상수상반":
          case "상수상반/배오효과":
            var key="herbs_plate";
            break;
          case "배오효과":
            var key="herbs_beo";
            break;
          default:
            var key="미분류";
        }
        this.setArrKWD(arrKWD,keywordArray,key,"herbs","herbs_keyword");
    },

    setLV(){
      this.LV=this.src[0].trim();
      this.removeLine("0");
    },

    setPrescription(arrayKey,keywordArray){
      if(!this.other["general"]['prescription']){
            var arrKWD =
                {"prescription":
                  {
                    "prescription_keyword":[]
                    ,"prescription_hindrance":[]
                  }
                };
        }else{
          var arrKWD=this.other["general"]['prescription'];
        }
        switch(arrayKey[1]){
          case "방제_키워드":
    			var key="prescription_keyword";
    			break;
    		case "방해":
    			var key="prescription_hindrance";
    			break;
    		default:
    			var key="미분류";
        }
        this.setArrKWD(arrKWD,keywordArray,key,"prescription","prescription_keyword");
    },
    setArrKWD(arrKWD,keywordArray,key,path1,path2){
      if(keywordArray[1].length){
        for(var i=0;i<keywordArray[1].length;i++){
          arrKWD[path1][key].push("\""+keywordArray[1][i]+"\"");
        }
      }
      if(keywordArray[0].length){
        for(var i=0;i<keywordArray[0].length;i++){
          arrKWD[path1][path2].push("\""+keywordArray[0][i]+"\"");
        }
      }
      this.other["general"][path1]=arrKWD;
    },
    getSha256(str){
     const editor = atom.workspace.getActiveTextEditor();
       if (editor) {
           var fnv = require('dding-fnv');
           var d =new Date();
           var hash = String(d.getFullYear())+String(d.getMonth()+1)+String(d.getDate())+String(d.getHours())+String(d.getMinutes())+String(d.getSeconds())+str;
           return fnv.hash64(hash, '1a');
       }
   }
}
