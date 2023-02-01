/// get request 
const tbody = document.getElementById("tbody");
const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:3000/data`, true);
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        // console.log(json);
        //  data=json.data;
        //  console.log(data);
        let newHtml = " ";


        json.forEach(element => {
            htmldata = `  <tr class="tbtr id="tr">
<td id="name">${element.a}</td>
<td id="productName">${element.b}</td>
<td id="price">${element.c}</td>
<td id="cash">${element.d}</td>
<td id="borrow">${element.e}</td>
<td id="number">${element.f}</td>
<td id="No item">${element.id}</td>
<td class="delete delbtn" onclick="deletedata(${element.id})"> delete </td>
            </tr>`
            newHtml += htmldata;
        });
        tbody.innerHTML = newHtml;
    }
    else {
        console.log("somthing went worng");
    }
}

xhr.send();

//submit button 
function submitbtn(event) {
    event.preventDefault();
    
    let a = document.getElementById("inputBox1").value;
    let b = document.getElementById("inputBox2").value;
    let c = document.getElementById("inputBox3").value;
    let d = document.getElementById("inputBox4").value;
    let e = document.getElementById("inputBox5").value;
    let f = document.getElementById("inputBox6").value;
    
    
    let data = { a, b, c, d, e, f };
    //  console.log(data);
    
    fetch(" http://localhost:3000/data", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((resp) => {
        // console.warn("resp",resp);;
        resp.json().then((result) => {
            console.warn("result", result)
        })
    })
}
//delete data 
function deletedata(id) {
    {

        fetch(`http://localhost:3000/data/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
            })
        })
    }
}
//serch 
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchTxt");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
