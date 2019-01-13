web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.35.210:8545"))
var account;
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidateNumber","type":"uint8"}],"name":"getCandidateName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCandidatesCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_bytes32","type":"bytes32"}],"name":"bytes32ToStr","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"canditateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
//VotingContract = web3.eth.contract(abi);

//contractInstance =  web3.eth.contract(abi).at('0x0ca681e65d87f020e6468fd00820ebaa4ea5dd8b');
contractInstance =  web3.eth.contract(abi).at('0x5ecd8f385e1520888225664911f31dd6f1e467a6');

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
//console.log("if start_1");
      add_table(tempCandidateName);
    }
  }
}

//console.log("obj length");
//console.log(_.size(candidates));

function voteForCandidate(candidate) {

 candidateName = $("#candidate").val();
console.log(candidateName);
 contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0], gas: 4700000}, function() {
  let div_id = candidates[candidateName];
  $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
 });

}

function add_table(newCandidateName) {
  var my_tbody = document.getElementById('my-tbody');
  var row = my_tbody.insertRow(my_tbody.rows.length); 
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var new_candidate = newCandidateName;

  cell1.innerHTML = new_candidate
  cell2.innerHTML = 0;

  candidates[new_candidate] = "candidate-" + (_.size(candidates)+1);
  //console.log("obj length2");
  //console.log(_.size(candidates));
 // console.log(candidates);
}
function add_row() {
  var new_candidate = document.getElementById("add_candidate").value
  add_table(new_candidate);

  contractInstance.addCandidate(new_candidate, {from: web3.eth.accounts[0], gas: 4700000}, function() {
  let div_id = candidates[new_candidate];
  $("#" + div_id).html(contractInstance.totalVotesFor.call(new_candidate).toString());
 });

  let val = contractInstance.getCandidatesCount.call().toNumber();
  console.log("add_raw_val : " + val);
  //web3.personal.newAccount(new_candidate);
}

$(document).ready(function() {

 candidateNames = Object.keys(candidates);
console.log("ready : " + candidateNames.length);
 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  let val = contractInstance.totalVotesFor.call(name).toNumber();
console.log("name, val : " + name + "," + val);
  $("#" + candidates[name]).html(val);
 }
});