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
    other : [],
    ann : {},
    image : "",
    a: "C:\\file\\a.yml",
    b: "C:\\file\\b.yml",
    init(){
      this.src=null,
      this.LV="";
      this.OR="";
      this.KO="";
      this.EN="";
      this.tagName="";
      this.className="";
      this.other=[];
      this.ann={};
      this.image="";
    },
    start(content) {

      this.src = content.split(/\r\n|\r|\n/g);
      this.setLV();
      if(this.LV.match(/[A-Z0-9]{2}/g) == null){
        alert("올바른 컨텐트가 아닙니다.");
        return false;
      };
      this.getTagName();
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
    },
    changeAnn(str){
      var pattern = /\{(.*?)\s?[:=]\s?(.*?)\}/gi;
      var matchArray = str.match(pattern);
      if(matchArray != null) {
        for(var i=0; i<matchArray.length; i++) {
          var key = matchArray[i].replace(pattern,"$1");
          var val = matchArray[i].replace(pattern,"$2");

          this.ann[key]=val;
        }
      }
      return str.replace(pattern, "[^$1]");
    },
    changeColon(str){
      return str.replace(/: /gi, ":");
    },
    changeImage(str){

    },
    changeNewLine(str){
      return str.replace(/{n}/gi, "\n");
    },
    changeQuot(str){
      try{
        str=str.replace(/'/gi, "＂");
        str=str.replace(/"/gi, "＂");
      }catch(e){
        this.error(str);
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
      var pattern=/[#]{1,2}/;
      var res=str.replace(pattern, "|");
      if(res != str){
         var sort="|--";
         var arr=split('{n}',res);
         var len=count(split("|",arr[0]));
         str="";
         for(var key in arr) {
           if(key == 0) {
             str+=arr[key]+"\n";
             for(var i=0; i<len; i++) {
               str += sort;
             }
           } else {
             str+="\n"+arr[key].trim();
           }
         }
         str="'''"+str+"'''";
      }else{
         str=res;
      }
      return str;
    },
    changeText(str){
      if(str){
      str=this.changeQuot(str);
    	str=this.changeColon(str);
    	str=this.changeNewLine(str);
    	str=this.changeSm(str);
    	str=this.changeIp(str);
    	str=this.changeLg(str);
    	str=this.changePs(str);
    	str=this.changeNg(str);
    	str=this.changeAnn(str);
    }else{
      str="";
    }
    	return str;
    },
    error(str){
        console.log(str);
    },
    getClassName(){

    },
    getEN(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((EN))\t");
        this.EN=arr[1];
        this.removeLine("0");
      }
    },
    getImageEN(){

    },
    getImageKO(){

    },
    getImageOR(){

    },
    getImageOR(){

    },
    divKeyword(str){
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
      return [arrKeyword,value.trim()];
    },
    getKO(){
      if(this.src[0] != undefined && this.src[0].trim() != ""){
        var arr = this.src[0].split("((KO))\t");
        this.KO=arr[1];
        this.removeLine("0");
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
        this.removeLine("0");
      }
    },
    getOther(){
      for(var i=0;i<this.src.length;i++){
          if(this.src[i]){
              var arr = this.src[i].split("\t");
              var key = arr[0].replace(/[\[\]]/g, "");
              var arryKey = key.split(">");
              if(arr[1]){
                  var keywordArray=this.getKeyword(arr[1]);
              }
              try{
                  this.error(arr);
                  keywordArray[1]=this.changeSm(keywordArray[1]);
                  keywordArray[1]=this.changeIp(keywordArray[1]);
                  keywordArray[1]=this.changeLg(keywordArray[1]);
                  keywordArray[1]=this.changePs(keywordArray[1]);
                  keywordArray[1]=this.changeNg(keywordArray[1]);
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
                  this.error(keywordArray);
              }
          }
      }
    },
    getTableEN(){

    },
    getTableKO(){

    },
    getTableOR(){

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
        }
        this.tagName=tagname;
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
    out(idx){
          var str = [];
          var hash = this.getSha256(idx);
          str.push('');
          str.push('- content_id: '+hash);
          str.push('  tagname: '+this.outValue(this.tagName));
          if(this.getLV() == "PP"){
          	image="IMG: ";
          	image+="<" +this.image['src']+">\n";
          	str.push("  "+image.trim());
          }
          if(this.className) str.push('  class: '+this.className.trim());
          str.push('  OR: ' + this.outValue(this.OR));
          if(this.KO) str.push('  KO: '+this.outValue(this.KO));
          if(this.EN) str.push('  EN: '+this.outValue(this.EN));

          str.push('');
          if(Object.keys(this.ann).length>0){
          	ann="NOTE:\n";
          	var cnt=0;
            for(var key in this.ann) {
              if(cnt == 0) {ann+="    ";}
              else {ann+="    ";}
              ann+="[^"+key+"]: "+this.ann[key]+"\n";
            	cnt++;
            }
          	str.push("  "+ann.trim()+"");
          }
          str.push('');
          this.appendFile(this.a,str.join("\n"));

          var str2 = [];

          if(this.other){

            for(var key in this.other) {
              //key = "accupoint";
              str.push('');
              str2.push('');

              for(var k1 in this.other[key]) {
                //k1=general
                str2.push('');
                str2.push('- content_id: '+hash);
                str.push('  '+key+': ');//치료
                str2.push('  '+key+': ');//치료
                for(var k2 in this.other[key][k1]) {
                  str.push('    '+k2+': ');//대상
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
                      str.push('      '+k3+': '+values+"]");
                      str2.push('      '+k3+': '+values+"]");
                    } else {
                      if(k1=="cure") {
                        str.push('      '+k3+': ');
                        str2.push('      '+k3+': ');
                      }
                    }
                  }
                }
              }
            }
          }
          this.appendFile(this.b,str2.join("\n"));
          //return str;
        },

        outValue(str){
          switch(this.getLV()){
            case "PP":
            case "TT":
              break;
            default:
              str = this.changeText(str);
          }
          return str.trim();
        },

    removeLine(idx){
      this.src.splice(idx,1);
    },

    setAcupoint(arrayKey,keywordArray){
      if(!this.other['acupoint']){
            var arrKWD =
              {"general":
                {"acupoint":
                  {
                    "acupoint_keyword":[]
                    ,"acupoint_acupoint":[]
                    ,"acupoint_chwiyeol":[]
                    ,"acupoint_stimulus":[]
                    ,"acupoint_requital":[]
                    ,"acupoint_manipulation":[]
                  }
                }
              };
        }else{
          var arrKWD=this.other['acupoint'];
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
        if(keywordArray[1])arrKWD["general"]["acupoint"][key].push("\""+keywordArray[1]+"\"");
        if(keywordArray[0])arrKWD["general"]["acupoint"]["acupoint_keyword"].push("\""+keywordArray[0]+"\"");
        this.other["acupoint"]=arrKWD;
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
      		switch(arrayKey[2]){
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

        if(keywordArray[1].trim()){
      		arrKWD['cure'][key1][key2].push("\""+keywordArray[1]+"\"");
      		if(keywordArray[0])arrKWD['cure'][key1][keyword].push("\""+keywordArray[0]+"\"");
      	}
      	this.other['cure']=arrKWD;
    },
    setEtc(arrayKey,keywordArray){
      if(!this.other['etc']){
            var arrKWD =
              {"general":
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
                }
              };
        }else{
          var arrKWD=this.other['etc'];
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
        if(keywordArray[1])arrKWD["general"]["etc"][key].push("\""+keywordArray[1]+"\"");
        if(keywordArray[0])arrKWD["general"]["etc"]["etc_keyword"].push("\""+keywordArray[0]+"\"");
        this.other["etc"]=arrKWD;
    },

    setGeneral(arrayKey,keywordArray){
      if(!this.other['general']){
            var arrKWD =
              {"general":
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
                }
              };
        }else{
          var arrKWD=this.other['general'];
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
        if(keywordArray[1])arrKWD["general"]["disease"][key].push("\""+keywordArray[1]+"\"");
        if(keywordArray[0])arrKWD["general"]["disease"]["disease_keyword"].push("\""+keywordArray[0]+"\"");
        this.other["general"]=arrKWD;
    },

    setHerbs(arrayKey,keywordArray){
      if(!this.other['herbs']){
            var arrKWD =
              {"general":
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
                }
              };
        }else{
          var arrKWD=this.other['herbs'];
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
        if(keywordArray[1])arrKWD["general"]["herbs"][key].push("\""+keywordArray[1]+"\"");
        if(keywordArray[0].length){
          for(var i=0;i<keywordArray[0].length;i++){
            arrKWD["general"]["herbs"]["herbs_keyword"].push("\""+keywordArray[0][i]+"\"");
          }
        }
        this.other["herbs"]=arrKWD;
    },

    setLV(){
      this.LV=this.src[0].trim();
      this.removeLine("0");
    },

    setPrescription(arrayKey,keywordArray){
      if(!this.other['prescription']){
            var arrKWD =
              {"general":
                {"prescription":
                  {
                    "prescription_keyword":[]
                    ,"prescription_hindrance":[]
                  }
                }
              };
        }else{
          var arrKWD=this.other['prescription'];
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
        if(keywordArray[1])arrKWD["general"]["prescription"][key].push("\""+keywordArray[1]+"\"");
        if(keywordArray[0])arrKWD["general"]["prescription"]["prescription_keyword"].push("\""+keywordArray[0]+"\"");
        this.other["prescription"]=arrKWD;
    },

    getSha256(str){
     const editor = atom.workspace.getActiveTextEditor();
       if (editor) {
           var d =new Date();
           var hash = String(d.getFullYear())+String(d.getMonth()+1)+String(d.getDate())+String(d.getHours())+String(d.getMinutes())+String(d.getSeconds())+str;
           return SHA256.getSha256(hash)
       }
   }
}
