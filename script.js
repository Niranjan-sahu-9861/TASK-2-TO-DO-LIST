const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerText;

const UserNameTextField = document.getElementById("userName");
const recordsDisplay = document.getElementById("records");

let userArray = [];

let objStr = localStorage.getItem('users');
if(objStr != null){
    userArray = JSON.parse(objStr);
}
displyInfo();

addUserBtn.onclick=() => {
    const name = UserNameTextField.value;
    if(edit_id != null){
        // edit
        userArray.splice(edit_id,1,{'name' : name});
        edit_id = null;
    }else{
        //insert
        
        userArray.push({'name' : name});
    }
    saveInfo(userArray);
    UserNameTextField.value = '';
    addUserBtn.innerText = btnText;
    
}
//save in memory function
function saveInfo(userArray){
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    displyInfo();
}
// 2. display function
function displyInfo(){
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<tr>
                        <th scope="row">${i+1}</th>                   
                        <td>${user.name}</td>
                        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick= 'editInfo(${i})'></i><i class="btn btn-danger text-white fa fa-trash" onclick='deleteInfo(${i})'>
                        </i></td>
                      </tr>`
    });
    recordsDisplay.innerHTML = statement;
}
// 3.edit function
function editInfo(id){
    edit_id = id;
    UserNameTextField.value = userArray[id].name;
    addUserBtn.innerText="save change";
}
// 4.delete function 
function deleteInfo(id){

    userArray.splice(id,1);
    saveInfo(userArray);
    
}