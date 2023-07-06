console.log("Hello World!!!");

fetch("http://localhost:8080/api/v1/player")
.then((response)=>{return response.json()})
.then(
    (parsedResponse) => {
        console.log(parsedResponse);

        parsedResponse.forEach(element => {
            console.log(element.id + " -- " + element.name);

            let wrapperDiv = document.createElement("div");
            wrapperDiv.className = "card";

            let cardTitleDiv = document.createElement("div");
            cardTitleDiv.className = "card-title";
            cardTitleDiv.textContent = element.id;
            
            let cardDescDiv = document.createElement("div");
            cardDescDiv.className = "card-description";
            cardDescDiv.textContent = element.name;

            wrapperDiv.appendChild(cardTitleDiv);
            wrapperDiv.appendChild(cardDescDiv);

            let cardBoardDiv = document.getElementById("cardBoard");
            cardBoardDiv.append(wrapperDiv);
        });
    }
)

console.log("DOne with Hello World!!!");