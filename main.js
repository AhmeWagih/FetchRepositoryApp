let myInput=document.querySelector(".get-repos input");
let myButton=document.querySelector(".get-button");
let myRepos=document.querySelector(".show-data");
myButton.onclick=function(){
  getRepos();
}
function getRepos(){
  if(myInput.value===""){
    // console.log("Value Can Not Empty")
    myRepos.innerHTML="<span> Please Write Github User Name </span>";
  }else{
    // console.log(myInput.value);
    fetch(`https://api.github.com/users/${myInput.value}/repos`)
    .then((response)=> response.json())
    .then((repos)=> {
      // console.log(repos);
      myRepos.innerHTML="";
      repos.forEach(repo => {
        // console.log(repo.name);
        let mainDiv=document.createElement("div");
        let repoName=document.createTextNode(repo.name);
        mainDiv.appendChild(repoName);
        let theUrl=document.createElement("a");
        let theUrlText=document.createTextNode("Visit");
        theUrl.appendChild(theUrlText);
        theUrl.href=`https://github.com/${myInput.value}/${repo.name}`;
        theUrl.setAttribute("target","_blank");
        mainDiv.appendChild(theUrl);
        let starsSpan=document.createElement("span");
        let starsText=document.createTextNode(`Stars ${repo.stargazers_count}`);
        starsSpan.appendChild(starsText);
        mainDiv.appendChild(starsSpan);
        mainDiv.className="repo-box";
        myRepos.appendChild(mainDiv);
      });
    });
  }
}