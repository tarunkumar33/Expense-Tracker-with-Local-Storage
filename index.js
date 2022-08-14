// Put DOM elements into variables

const myForm=document.getElementById('my-form');
const amt=document.getElementById('amt');
const desc=document.getElementById('desc');
const category=document.getElementById('category');
const users=document.getElementById('users');
const msg = document.querySelector('.msg');


// Listen for form submit

myForm.addEventListener('submit',submitHandler);
users.addEventListener('click',clickHandler);
window.addEventListener('DOMContentLoaded',fetchHandler);

function submitHandler(e){
    e.preventDefault();

    if(amt.value === '' || desc.value === ''|| category.value==='') {
        // alert('Please enter all fields');
        msg.classList.add('text-danger');
        msg.innerHTML = 'Please enter all fields';
    
        // Remove error after 3 seconds
        setTimeout(() => msg.innerHTML="", 3000);
      } 

    else{  
    addli(amt.value,desc.value,category.value);
    //storing
    let obj={
        amt:amt.value,
        desc:desc.value,
        category:category.value
    }
    let tempId=`${amt.value}-${desc.value}-${category.value}`;
    if(localStorage.getItem(tempId)){
        let del=document.getElementById(tempId);
        del.remove();
    }
    localStorage.setItem(tempId,JSON.stringify(obj));

    //clear all fields
    amt.value="";
    desc.value="";
    category.value="";
}

}

function fetchHandler(){
//fetching from local storage
Object.keys(localStorage).forEach((key)=>{
    let item=localStorage.getItem(key);
    item=JSON.parse(item);

    addli(item.amt,item.desc,item.category);

})
}

function addli(amt1,desc1,category1){

    // Create new list item with user
    let li=document.createElement('li');
    li.className="list-group-item";
    let tempId=`${amt1}-${desc1}-${category1}`;
    li.id=tempId;

    // Add text node with input values
    li.appendChild(document.createTextNode(tempId));

    //delete btn
    let btn=document.createElement('button');
    btn.className="btn btn-danger btn-sm float-right delete";
    btn.appendChild(document.createTextNode('X'));
    li.appendChild(btn);

    //edit btn
    btn=document.createElement('button');
    btn.className="btn btn-primary btn-sm float-right edit";
    btn.appendChild(document.createTextNode('-'));
    li.appendChild(btn);
    
    users.appendChild(li);

}

function clickHandler(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        let dele=e.target.parentElement.id;
        localStorage.removeItem(dele);
        e.target.parentElement.remove();
    }
    else if(e.target.classList.contains('edit')){
        let edi=e.target.parentElement.id;
        let obj=JSON.parse(localStorage.getItem(edi));
        amt.value=obj.amt;
        desc.value=obj.desc;
        category.value=obj.category;

    }
}