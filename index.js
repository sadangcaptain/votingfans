web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.35.210:8545"))
var account;
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
//VotingContract = web3.eth.contract(abi);

contractInstance =  web3.eth.contract(abi).at('0x0ca681e65d87f020e6468fd00820ebaa4ea5dd8b');

candidates = {"Alice": "candidate-1", "Bob": "candidate-2", "Gon": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();

 contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0], gas: 4700000}, function() {
  let div_id = candidates[candidateName];
  $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
 });

}

function add_row() {
      var my_tbody = document.getElementById('my-tbody');
      var row = my_tbody.insertRow(my_tbody.rows.length); 
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var new_candidate = document.getElementById("add_candidate").value;

      cell1.innerHTML = new_candidate
      cell2.innerHTML = 0;

      web3.personal.newAccount(new_candidate);
    }

$(document).ready(function() {

 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
  let name = candidateNames[i];
  let val = contractInstance.totalVotesFor.call(name).toNumber();
  $("#" + candidates[name]).html(val);
 }
});