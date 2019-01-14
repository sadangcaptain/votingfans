web3 = new Web3(new Web3.providers.HttpProvider("http://1.238.113.136:8545/"))

var account;
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidateNumber","type":"uint8"}],"name":"getCandidateName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCandidatesCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_bytes32","type":"bytes32"}],"name":"bytes32ToStr","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"canditateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
//VotingContract = web3.eth.contract(abi);

//contractInstance =  web3.eth.contract(abi).at('0x0ca681e65d87f020e6468fd00820ebaa4ea5dd8b');
contractInstance =  web3.eth.contract(abi).at('0x1ef4544f5e8f39bdf70cf9d8adb656bbef23a71c');

var candidateCount = contractInstance.getCandidatesCount.call().toNumber();
console.log("candidateCount : " + candidateCount);


candidates = {"BTS": "candidate-1", "Eminem": "candidate-2", "Katy Perry": "candidate-3", "Michael Jackson": "candidate-4", "Talyor Swift": "candidate-5", "Ariana Grande": "candidate-6", "One Drection": "candidate-7", "Justin Bieber": "candidate-8"}

console.log("candidateLength : " + _.size(candidates));


if(candidateCount != _.size(candidates)) {

var tempCandidateName;
//
//console.log("for start");
  for(var i=0; i<candidateCount; i++) {
//console.log("for start_1");
    tempCandidateName = contractInstance.getCandidateName.call(i).toString();
//console.log("if start_0");
    if(candidates[tempCandidateName] == null) {
console.log("if start_1, name: " + tempCandidateName);
      add_table(tempCandidateName);
    }
  }
}

//console.log("obj length");
//console.log(_.size(candidates));

function voteForCandidate(candidate) {
 //candidateName = $("#candidate").val();
 candidateName = candidate;
console.log(candidateName);
 contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0], gas: 4700000}, function() {
  let div_id = candidates[candidateName];
  $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
 });

}

function add_table(newCandidateName) {
  //var my_tbody = document.getElementById('my-tbody');
  //var row = my_tbody.insertRow(my_tbody.rows.length); 
  //var cell1 = row.insertCell(0);
  //var cell2 = row.insertCell(1);
  
  //my_cbody.append("<li>aaa</li>");
    //"<ul class=\"vote_list\"><li class=\"vote_images\"><button>VOTE</button><img src=\"./images/one.jpg\"></li><li class=\"vote_name\"><p>One Drection</p></li><li class=\"vote_number\"><p id=\"candidate-7\">0</p></li></ul>");
  var new_candidate = newCandidateName;
  var temp_html = ""; 

  //$("#my_c_body").append("<ul class=\"vote_list\"><li class=\"vote_images\"><button>VOTE</button><div class=\"color_random_4\"></div></li><li class=\"vote_name\"><p>One Drection</p></li><li class=\"vote_number\"><p id=\"candidate-7\">0</p></li></ul>");

  //cell1.innerHTML = new_candidate
  //cell2.innerHTML = 0;
  if(valid_candidate_name(new_candidate) == true) {
    candidates[new_candidate] = "candidate-" + (_.size(candidates)+1);

    temp_html = "<ul class=\"vote_list\"><li class=\"vote_images\"><button onclick=\"voteForCandidate('" + new_candidate + "');\">VOTE</button><div class=\"color_random_" + (Math.floor(Math.random() * 7) + 1) + "\"></div></li><li class=\"vote_name\"><p>" + new_candidate + "</p></li><li class=\"vote_number\"><p id=\"" + candidates[new_candidate] + "\">0</p></li></ul>";

    $("#my_c_body").append(temp_html);
    //cell2.id = candidates[new_candidate];
    //console.log("obj length2");
    //console.log(_.size(candidates));
    //console.log(candidates);
    return true;
  }
  else {
    return false;
  }
}

function valid_candidate_name(candidateName) {
  var candidate_name = candidateName
  var state = true;
  
  if(candidate_name == "") {
    alert("공백은사용할 수 없습니다.");
    state = false;
  }
  else if(state == true) {
    candidateNames = Object.keys(candidates);
console.log("valid_candidate_name : " + candidateNames.length);
    for(var i=0; i<candidateNames.length; i++) {
      var name = candidateNames[i];
      if (name == candidate_name){
        alert("이미 사용되고 있는 이름입니다.");
        state = false;
      } 
    }
  }

  return state;
}

function add_row() {
  var new_candidate = document.getElementById("add_candidate").value
  
  if(add_table(new_candidate) == true) {
    contractInstance.addCandidate(new_candidate, {from: web3.eth.accounts[0], gas: 4700000}, function() {
    let div_id = candidates[new_candidate];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(new_candidate).toString());
   });

    let val = contractInstance.getCandidatesCount.call().toNumber();
    console.log("add_raw_val : " + val);
  //web3.personal.newAccount(new_candidate);
  }
}

$(document).ready(function() {

 candidateNames = Object.keys(candidates);
console.log("ready : " + candidateNames.length);
 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  let val = contractInstance.totalVotesFor.call(name).toNumber();
//console.log("name, val : " + name + "," + candidates[name], ","+ val);
  $("#" + candidates[name]).html(val);
 }
});