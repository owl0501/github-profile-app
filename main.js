const api_url='https://api.github.com/users/';
const profile_card=document.querySelector('#profile-card');
const search=document.querySelector('#search');
const search_input=document.querySelector('#search-input');

search.addEventListener('submit',function(ev){
    ev.preventDefault();
    const user=search_input.value;
    getUser(api_url+user);
});



//串接上api
async function fetchApi(api) {
    const resp = await fetch(api);
    const respData = await resp.json();
    console.log('await', respData);
    return respData;
}

async function getUser(api){
    const data=await fetchApi(api);
    const repos=await fetchApi(api+'/repos');
    creatUserCard(data);
    addRepos(repos);
}


function creatUserCard(data){
    const {avatar_url,bio,name,followers,following,public_repos,login}=data;
    console.log(avatar_url,name);
    profile_card.innerHTML=`
        <div class="avatar">
            <img src=${avatar_url} alt=${name}/>
        </div>
        <div class="user-intro">
            <div class="sub-header">
                <h2>${name}</h2>
                <span>${login}</span>
            </div>
            <p>${bio}</p>
            <ul>
                <li>
                    ${followers}
                    <i class="fas fa-users"></i>
                </li>
                <li>
                    ${following}
                    <i class="fas fa-eye"></i>
                </li>
                <li>
                    ${public_repos}
                    <i class="fas fa-window-restore"></i>
                </li>
            </ul>
            <h4>Repos:</h4>
            <div id="repos" class="repos-wrap">
            </div>
        </div>

    `;
}

function addRepos(repos){
    const reposEl=document.querySelector('#repos');
    repos
        .sort((a,b)=>{
            return (b.stargazers_count-a.stargazers_count)
        })
        .slice(0,10)
        .forEach(function(item){
            const repoEl=document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.innerText=item.name;
            repoEl.href=item.html_url;
            reposEl.appendChild(repoEl);
        });
}