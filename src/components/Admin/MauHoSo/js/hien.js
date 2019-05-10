JSONDATA = {"array":[]};
class mauHoSoElement{
	constructor(parentID, level,par){
		this.parentID =  parentID;
		var idx = document.getElementById(parentID).children.length;
		this.id = parentID+"_"+idx;
		this.level = level;
		this.type= "longText"
		this.isGroup = false;
		this.name = "";
		this.par = par;
		this.initGraphic();

	if(this.par.arr === undefined) this.par.arr = [];
		this.par.arr.push(this);
		this.par.isGroup=true;
	}

	initGraphic(){
		var seft = this;
		var node = document.createElement("DIV");
		this.node = node;
		node.id = this.parentID
		var textBox = document.createElement("input");
		textBox.type="text";
		textBox.id="textBox";
		textBox.placeholder="Tên trường"
		textBox.innerHTML=this.parentID;
		textBox.addEventListener("keyup",function(){
			seft.name = this.value;
		});
		node.appendChild(textBox);
		//===========================
		node.id=this.id;
		node.style.marginLeft=50+"px"
		node.style.marginTop=20+"px"
		//================
		var selectType = document.createElement("select");
		selectType.id=this.id+"select"
		node.appendChild(selectType);
		selectType.style.marginLeft="20px";
		var listType =  ["longText","shortText","boolean"];
		var listTypeName = ["Mô tả dài", "Mô tả ngắn", "Đánh dấu"];
		for(var i = 0; i<listType.length; i++){
			var aOption = document.createElement("option");
			aOption.value=listType[i];
			aOption.innerHTML=listTypeName[i];
			selectType.appendChild(aOption);
		}

		selectType.addEventListener("change",function(){
			seft.type = this.value;
			console.log(this.value);
		});

		var aButton = document.createElement("BUTTON");
		aButton.innerHTML="+";
		aButton.className="button1 buttonAdd"
		aButton.style.marginLeft="20px"
		node.appendChild(aButton);
		aButton.addEventListener("click",function(){
			if(textBox.value=="") {
				alert("Phai dien ten");
				return;
			}
			addNode(this.id,this.level+1,this);
			selectType.hidden=true;
			this.type=undefined;
		}.bind(this));

		var aButton = document.createElement("BUTTON");
		aButton.innerHTML="x";
		aButton.className="button1 buttonRemove"
		aButton.style.marginLeft="20px"
		node.appendChild(aButton);
		aButton.addEventListener("click",function(){
			var parentNode = document.getElementById(this.parentID);
			var currNode = document.getElementById(this.id);
			parentNode.removeChild(currNode);
			for(var i =0; i<this.par.arr.length; i++){
				if(this.par.arr[i].id==this.id) {
					this.par.arr.splice(i,1);
					break;
				}
			}
			if(this.par.arr.length==0){
				this.par.isGroup=false;
				var s = document.getElementById(this.par.id+"select");
				s.hidden=false;
				this.par.type=s.value;
				this.par.arr=undefined;
			}
		}.bind(this));
		return node;
	}
	getMauHoSoElement(){
		return this.node;
	}

	getMauHoSoRender(){
		var bigNode = document.createElement("div");
			bigNode.style.marginLeft="20px";
		if(!this.isGroup){
			switch(this.type){
				case "longText":{
					var title = document.createElement("h4");
					title.innerHTML=this.name;
					var br = document.createElement("br");
					var textArena = document.createElement("textArea");
					textArena.rows="8";
					textArena.cols="50";
					bigNode.appendChild(title);
					bigNode.appendChild(textArena);
					break;
				}
				case "shortText":{
					var title = document.createElement("h4");
					title.innerHTML=this.name;
					var textBox = document.createElement("input");
					textBox.type="text";
					bigNode.appendChild(title);
					bigNode.appendChild(textBox);
					break;
				}
				case "boolean":{
					var checkbox1 = document.createElement("input");
					checkbox1.type="checkBox";
					var text1 = document.createTextNode(this.name);
					bigNode.appendChild(checkbox1);
					bigNode.appendChild(text1);
					break;
				}
			}
			return bigNode;
		} else {
			var title = document.createElement("h"+this.level);
				title.innerHTML=this.name;
				bigNode.appendChild(title);
			for(var i =0; i<this.arr.length; i++){
				bigNode.appendChild(this.arr[i].getMauHoSoRender());
			}
			return bigNode;
		}
	}

}

var addNode = function(parentID,level,par){
	var testDiv = document.getElementById(parentID);
	aNode = new mauHoSoElement(parentID,level,par);
	testDiv.appendChild(aNode.getMauHoSoElement());
}

getResult = function(){
	return JSON.stringify(JSONDATA, function( key, value)
	{
		var listHide = ['par','parentID','level','node']
		if(listHide.includes(key)) {
			return undefined;
		} else {
			return value;
		};
	},4);
}

var b = document.getElementById("viewRs");
var c = document.getElementById("are");
var d = document.getElementById("firstNode");
d.addEventListener("click",function(){
	console.log("add node");
	addNode("root",1,JSONDATA);
})


b.addEventListener("click",function(){
	are.innerHTML = getResult();
})

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  var modalConten = document.getElementById("modal-content");
  while (modalConten.firstChild) {
    modalConten.removeChild(modalConten.firstChild);
}
  for(var i = 0; i<JSONDATA.arr.length; i++){
	  modalConten.appendChild(JSONDATA.arr[i].getMauHoSoRender());
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
