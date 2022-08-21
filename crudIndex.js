// Put DOM elements into variables
//axios instance
let axiosObj = axios.create({
    baseURL: 'https://crudcrud.com/api/047f9ed728fd44019199aef496efaf9f'
});
let uniqueId = '';

const myForm = document.getElementById('my-form');
const amt = document.getElementById('amt');
const desc = document.getElementById('desc');
const category = document.getElementById('category');
const users = document.getElementById('users');
const msg = document.querySelector('.msg');


// Listen for form submit

myForm.addEventListener('submit', submitHandler);
users.addEventListener('click', clickHandler);
window.addEventListener('DOMContentLoaded', fetchHandler);

function submitHandler(e) {
    e.preventDefault();

    if (amt.value === '' || desc.value === '' || category.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('text-danger');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.innerHTML = "", 3000);
    }

    else {

        //storing
        let obj = {
            amt: amt.value,
            desc: desc.value,
            category: category.value
        }
        if (uniqueId != '') {

            axiosObj.put(`/expenseData/${uniqueId}`, obj)
                .then(res => {
                    console.log(res.data);
                    document.getElementById(uniqueId).remove();
                    showScreen({ uniqueId, ...obj });
                    //clear all fields
                    amt.value = "";
                    desc.value = "";
                    category.value = "";
                    uniqueId = '';
                })
                .catch(err => console.log(err));
        }
        else {
            axiosObj.post("/expenseData", obj)
                .then(res => {
                    console.log(res.data);
                    showScreen(res.data);
                })
                .catch(err => console.log(err));
            //clear all fields
            amt.value = "";
            desc.value = "";
            category.value = "";
        }
    }

}

function fetchHandler() {

    axiosObj.get("/expenseData")
        .then(res => {
            for (let i of res.data) {
                showScreen(i);
            }
        })
        .catch(err => console.log(err));
}

function showScreen(user) {
    let amt1 = user.amt;
    let desc1 = user.desc;
    let category1 = user.category;

    // Create new list item with user
    let li = document.createElement('li');
    li.className = "list-group-item";
    let tempId = `${amt1}-${desc1}-${category1}`;
    li.id = user._id;

    // Add text node with input values
    li.appendChild(document.createTextNode(tempId));

    //delete btn
    let btn = document.createElement('button');
    btn.className = "btn btn-danger btn-sm float-right delete";
    btn.appendChild(document.createTextNode('X'));
    li.appendChild(btn);

    //edit btn
    btn = document.createElement('button');
    btn.className = "btn btn-primary btn-sm float-right edit";
    btn.appendChild(document.createTextNode('-'));
    li.appendChild(btn);

    users.appendChild(li);

}

function clickHandler(e) {
    e.preventDefault();
    uniqueId = e.target.parentElement.id;
    if (e.target.classList.contains('delete')) {
        axiosObj.delete(`/expenseData/${uniqueId}`)
            .then(res => e.target.parentElement.remove())
            .catch(err => console.log(err));

    }
    else if (e.target.classList.contains('edit')) {
        axiosObj.get(`/expenseData/${uniqueId}`)
            .then(res => {
                amt.value = res.data.amt;
                desc.value = res.data.desc;
                category.value = res.data.category;
            })
            .catch(err => {
                uniqueId = '';
                console.log(err);
            });
    }
}