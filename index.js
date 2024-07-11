const url = "https://api.github.com/users/";
const theme_change = document.querySelector("[theme-change]");
const theme_change_text = document.querySelector("[theme_text]");
const theme_change_icon = document.querySelector(".theme-img");
const search_user_input = document.querySelector("[user_input]");
const clear_input = document.querySelector("[clear_input]");
const search_button = document.querySelector("[search]");
const no_search_result = document.querySelector("[no-search]");
const user_avatar = document.querySelector("[user_avatar]");
const user_name = document.querySelector("[username]");
const user_date = document.querySelector("[joindate]");
const user_url = document.querySelector("[userlink]");
const user_bio = document.querySelector("[userbio]");
const user_repos = document.querySelector("[repos]");
const user_followers = document.querySelector("[followers]");
const user_following = document.querySelector("[following]");
const user_location = document.querySelector("[location]");
const user_portfolio = document.querySelector("[portfolio]");
const user_twitter = document.querySelector("[twitter]");
const user_company = document.querySelector("[company]");

search_button.addEventListener('click',()=>
    {searchuser()});
search_user_input.addEventListener('keydown',
    (e) => {
        if(e.key === "Enter"){
            searchuser();
        }
    }
)
search_user_input.addEventListener("input",()=>{
        clear_input.classList.add("active");
        clearinput();
})
function clearinput(){
    clear_input.addEventListener("click",()=>{
        search_user_input.value = "";
        clear_input.classList.remove("active");
    })
}
function searchuser(){
    if(search_user_input.value!= ""){
        getuserdata(url + search_user_input.value);
    }
    else{
        noinput();
    }
}
async function noinput(){
        no_search_result.classList.add("active");
        no_search_result.innerText = "No input";
    setTimeout(() => {
        no_search_result.classList.remove("active");
    }, 2000);
}
async function getuserdata(giturl){

    const response = await fetch(giturl);
    const data =await response.json();
    console.log(data);   
    
    if(!data){
        throw data;
    }
    if(data.message === "Not Found"){
        nodata();
    }
    renderuserdata(data);
        
}
function nodata(){
    no_search_result.classList.add("active");
    no_search_result.innerText = "No Search Result Found";
    setTimeout(() => {
        no_search_result.classList.remove("active");
    }, 2000);   
}


function renderuserdata(data){
    let datesegment;
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function checkNull(apiItem, domItem) {
        if (data.message !== "Not Found") {
            if (!apiItem || domItem === null) {
                if (domItem) {
                    domItem.style.opacity = 0.5;
                    const prevSibling = domItem.previousElementSibling;
                    if (prevSibling) {
                        prevSibling.style.opacity = 0.5;
                    }
                }
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
    
    user_avatar.src = `${data?.avatar_url}`;
    user_name.innerText = data?.name;
    function userlink(){
        user_url.innerText = data?.login;
        user_url.href = `${data?.url}`;
        user_url.classList.add("active");
        const date_name = document.querySelector(".date_name");
        date_name.classList.add("start");
    }
    userlink();
    user_bio.innerText = (data?.bio != null) ? data?.bio : "No bio Available";
    datesegment = data?.created_at.split("T").shift().split("-");
    user_date.innerText = `Joined ${datesegment[2]} ${month[datesegment[1]-1]} ${datesegment[0]}`;
    user_repos.innerText = data?.public_repos;
    user_followers.innerText = data?.followers;
    user_following.innerText = data?.following;
    user_location.innerText = checkNull(data?.location,user_location) ? data?.location : "Not Available";
    user_portfolio.innerText = checkNull(data?.blog,user_portfolio) ? data?.blog : "Not Available";
    user_twitter.innerText = checkNull(data?.twitter_username,user_twitter) ? `https://twitter.com/${data?.twitter_username}` : "Not Available";
    user_company.innerText = checkNull(data?.company,user_company) ? data?.company : "Not available";
}
let darkmode = false;
const root = document.documentElement.style;
theme_change.addEventListener("click",()=>{
    if(darkmode === false){
        enabledarkmode();
    }
    else{
        enablelightmode();
    }
})

function enabledarkmode(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    theme_change_icon.src = "Images/sun-icon.svg";
    theme_change_text.innerText = "LIGHT";
    darkmode = true;
}
function enablelightmode(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    theme_change_icon.src = "Images/moon-icon.svg";
    theme_change_text.innerText = "DARK";
    darkmode = false;
}