// getting all required elements
// SOURCE: https://dev.to/codingnepal/search-bar-with-autocomplete-search-suggestions-in-javascript-32dn
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const resBox = document.querySelector(".search-result");
// let linkTag = searchWrapper.querySelector("a");
// let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            // webLink = `https://www.google.com/search?q=${userData}`;
            // linkTag.setAttribute("href", webLink);
            // linkTag.click();
            resBox.querySelector("p").innerHTML = ingredients[userData];
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        ingredientStr = ingredients[selectData];
        ingredientStr = ingredientStr.replace(
                        /MILK|EGGS|EGG|PEANUTS|PEANUT|SOYBEANS|SOYBEAN|SOY|WHEAT|TREE|WALNUTS|PECANS|CASHEWS|ALMONDS|PISTACHIOS|HAZELNUTS|NUTS|NUT|SHELLFISH|SHRIMP|CRAB|LOBSTER|CLAMS|CLAM|MUSSELS|OYSTERS|SCALLOPS|FISH|SALMON|TUNA|HALIBUT/gi, 
                       function(match){ return "<b>" + match + "</b>"; }
                       );
        resBox.querySelector("p").innerHTML = ingredientStr;
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
