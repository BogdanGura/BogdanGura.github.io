//! 7/13/23 Started

window.addEventListener('load', createListener);

function createListener() 
{
    let button = document.getElementById('btn');

    if(button.addEventListener)
    {
        button.addEventListener('click', getOrderSummary, false);
    }
    else if(button.attachEvent)
    {
        button.attachEvent('onclick', getOrderSummary, false);
    }
}

//? Does crust array contain input elements, is there anything there ?
function getOrderSummary() 
{
    //*Variables for the Form
    let nameF = document.getElementById('nameF');
    let streetAdressF = document.getElementById('streetAdressF');
    let cityF = document.getElementById('cityF');
    let emailF = document.getElementById('emailF');
    let phoneF = document.getElementById('phoneF');
    //*Order Info section
    let crustF = document.getElementsByName('crust');
    let sizeF = document.getElementById('sizeF');
    let toppingsF = document.getElementsByName('top');
    let specialF = document.getElementById('specialF');

    //*Summary Fields
    let nameS = document.getElementById('nameS');
    let streetAdressS = document.getElementById('streetAdressS');
    let cityS = document.getElementById('cityS');
    let emailS = document.getElementById('emailS');
    let phoneS = document.getElementById('phoneS');
    //*Order section
    let crustS = document.getElementById('crustS');
    let sizeS = document.getElementById('sizeS');
    let toppingsS = document.getElementById('toppingsS');
    let specialS = document.getElementById('specialS');

    //*Order summary object
    let orderSummary = {

        //*DeliveryInfo sub-object
        deliveryInfo: {
            name:"",
            streetAdress:"",
            city: "",
            email: "",
            phone:""
        },

        //*Order info sub-object
        orderInfo: {
            crust:"",
            size:"",
            toppings:[],
            special:""
        }
    };

    //*Inserting info into a order summary object
    //*Loading Delivery information
    orderSummary.deliveryInfo.name = nameF.value;
    orderSummary.deliveryInfo.streetAdress = streetAdressF.value;
    orderSummary.deliveryInfo.city = cityF.value;
    orderSummary.deliveryInfo.email = emailF.value;
    orderSummary.deliveryInfo.phone = phoneF.value;

    //*Loading crust Information
    for(let i = 0; i < crustF.length; i++)
    {
        console.log(crustF);
        if(crustF[i].checked)
        {
            console.log(crustF);
            orderSummary.orderInfo.crust = crustF[i].value;
        }
    }
    //*Other
    orderSummary.orderInfo.size = sizeF.value;

    //*Inserting toppings
    for(let i = 0; i < toppingsF.length; i++)
    {
        if(toppingsF[i].checked)
        {
            orderSummary.orderInfo.toppings[i] = toppingsF[i].value;
        }
    }
    //*Loading special requests
    orderSummary.orderInfo.special = specialF.value;

    //!Unloading orderSummary into text fields
    //*Unloading Delivery Info
    nameS.innerHTML = orderSummary.deliveryInfo.name;
    streetAdressS.innerHTML = orderSummary.deliveryInfo.streetAdress;
    cityS.innerHTML = orderSummary.deliveryInfo.city;
    emailS.innerHTML = orderSummary.deliveryInfo.email;
    phoneS.innerHTML = orderSummary.deliveryInfo.phone;

    //*Unloading order info
    crustS.innerHTML += orderSummary.orderInfo.crust;
    sizeS.innerHTML += orderSummary.orderInfo.size;

    //*Unloading toppings from the toppings array
    for (let i = 0; i < orderSummary.orderInfo.toppings.length; i++) 
    {
        
        if(orderSummary.orderInfo.toppings[i] !== undefined)
        {
            let element = document.createElement('li');
            //*load element with info from array
            element.innerHTML = orderSummary.orderInfo.toppings[i];
            //*Append element to the toppingsS
            toppingsS.appendChild(element);
        }
        
    }
    //*Special field
    specialS.innerHTML += orderSummary.orderInfo.special;
}