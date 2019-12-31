web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0x19143496a22b8aa1230394dcb9d8bdc9620bacdd');

candidates = {
  "Mayank": "candidate-1",
  "Yash": "candidate-2",
  "Prateek": "candidate-3",
  "Harsh": "candidate-4",
  "Rajpal": "candidate-5",
  "Prerna": "candidate-6"
}

function voteForCandidate(id) {
  var candidateName = $("input[name=votecandidate]").val();

  var voteflag = confirm("Confirm Vote");

  console.log('====================================');
  console.log("TRUE");
  console.log('====================================');

  if (voteflag == true) {
    
    contractInstance.voteForCandidate(candidateName, {
      from: web3.eth.accounts[1]
    }, function () {
      console.log('====================================');
      console.log('transaction complete');
      console.log('====================================');
      console.log(contractInstance.totalVotesFor.call(candidateName).toString());
      window.location = "/voteadded/" + id;
    });
  }
}


var electionResults = (function getElectionResults() {
  var voteResults = {};
  candidateNames = Object.keys(candidates);

  for (var i = 0; i < candidateNames.length; i++) {
    var name = candidateNames[i];
    var val = contractInstance.totalVotesFor.call(name).toLocaleString();
    voteResults[name] = val;
  }
  return voteResults;
})

