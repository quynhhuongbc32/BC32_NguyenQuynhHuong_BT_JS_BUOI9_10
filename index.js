
  // hàm kiểm tra tổng
function validateForm(){
  let isvalid = true;
  isvalid = validateID() & validateName() & validateEmail() & validatePassword() & validateDay() & validateSalary() & validatePosition() & validateTime();

  if(!isvalid){
      alert("Form không hợp lệ");
      let spanEl = dom('.sp-thongbao'); 
      spanEl.style.display = 'block'; // Nếu lỗi thì hiển thị thông bao lỗi ra
      return false;
  }
  return true;
}
  function validateID() {
    let id = dom("#tknv").value;
    let spanEl = dom("#tbTKNV");
    // Kiểm tra rỗng
    if (!id) {
      spanEl.innerHTML = "Tài khoản không được để trống";
      return false;
    }
    // Kiểm tra số lượng kí tự
    if (id.length < 4 || id.length > 6) {
      spanEl.innerHTML = "Tài khoản phải từ 4 đến 6 kí tự";
      return false;
    }
  
    spanEl.innerHTML = "";
    return true;
  }
  // Hàm kiểm tra input Tên nhân viên
  function validateName() {
    let name = dom("#name").value;
    let spanEl = dom("#tbTen");
    // Kiểm tra rỗng
    if (!name) {
      spanEl.innerHTML = "Tên nhân viên không được để trống";
      return false;
    }
  
    spanEl.innerHTML = "";
    return true;
  }
  // Hàm kiểm tra input Email
  function validateEmail() {
    let email = dom("#email").value;
    let spanEl = dom("#tbEmail");
    if (!email) {
      spanEl.innerHTML = "Email không được để trống";
      return false;
    }
    // Kiểm tra định dạng của email
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
      spanEl.innerHTML = "Email không đúng định dạng";
      return false;
    }
  
    spanEl.innerHTML = "";
    return true;
  }
  // Hàm kiểm tra input Mật khẩu
  function validatePassword() {
    let password = dom("#password").value;
    let spanEl = dom("#tbMatKhau");
  
    if (!password) {
      spanEl.innerHTML = "Mật khẩu không được để trống";
      return false;
    }
    // Kiểm tra định dạng mật khẩu (6-10 kí tự 1 số, 1 chữ hoa, ít nhất 8 kí tự)
    // Tối thiểu tám và tối đa 10 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt:
   
    let regex = /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (!regex.test(password)) {
      spanEl.innerHTML = "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 chữ cái viết thường 1 ký tự đặc biệt";
      return false;
    }
  
    spanEl.innerHTML = "";
    return true;
  }
  function validateDay() {
    let day = dom("#datepicker").value;
    let spanEl = dom("#tbNgay");
  
    if (!day) {
      spanEl.innerHTML = "Ngày làm không được để trống";
      return false;
    }
    spanEl.innerHTML = "";
    return true;
  }

validateSalary
  function validateSalary() {
    let salary = dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");
  
    if (!salary) {
      spanEl.innerHTML = "Lương không được để trống";
      return false;
    }
    if(salary < 1e6 || salary > 2e7){
        spanEl.innerHTML = "Lương cơ bản từ 1.000.000 - 20.000.000";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
  }
validatePosition
  function validatePosition() {
    let position = dom("#chucvu").value;
    let spanEl = dom("#tbChucVu");
  
    if (!position) {
      spanEl.innerHTML = "Chức vụ không được để trống";
      return false;
    }
    spanEl.innerHTML = "";
    return true;
  }

validateTime
  function validateTime() {
    let time = dom("#gioLam").value;
    let spanEl = dom("#tbGiolam");
  
    if (!time) {
      spanEl.innerHTML = "Giờ làm không được để trống";
      return false;
    }
    if( hours < 80 || hours > 200){
        spanEl.innerHTML = "Số giờ làm trong tháng từ 80-200 giờ";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
  }

  
const USERID = {
  id: dom("#tknv"),
  name: dom("#name"),
  email: dom("#email"),
  password: dom("#password"),
  datepicker: dom("#datepicker"),
  salary: dom("#luongCB"),
  position: dom("#chucvu"),
  hours: dom("#gioLam"),
}   
function Member (
    id,
    name,
    email,
    password,
    datepicker,
    salary,
    position,
    hours
) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.salary = salary;
    this.position = position;
    this.hours =hours;
}
// Xếp loại nhân viên
Member.prototype.rank = function () {
    if (this.hours >= 192) {
      return "Nhân viên XS";
    }
    else if (this.hours >= 176) {
      return "Nhân viên giỏi";
    }
    else if (this.hours >= 160) {
      return "Trung Nhân viên khá";
    }
       else {
    return "Nhân viên TB";
       }
  
};
//tổng lương
Member.prototype.calcSalary = function(){
  switch(this.position){
      case "Sep":{
          return this.salary * 3;
      }
      case "TP":{
          return this.salary * 2;
      }
      case "NV":{
          return this.salary;
      }
  }
}

let members = [];

// Thêm nhân viên
  function addMember() {
  // B0: Kiểm tra Validate Form trước
  if(!validateForm()){
     return;
  }
  // B1: DOM lấy thông tin từ các input, và kiểm tra hợp lệ
  // B2: Tạo object member chứa các thông tin trên
    let member = new Member(
    USERID.id.value,
    USERID.name.value,
    USERID.email.value,
    USERID.password.value,
    USERID.datepicker.value,
    USERID.salary.value,
    USERID.position.value,
    USERID.hours.value,
  );
  console.log(member);
  // B3: Thêm object member vào array students, và lưu trữ vào localStorage
  members.push(member);
  localStorage.setItem("members", JSON.stringify(members));

  // B4: Hiển thị ra giao diện
  display(members);

  // B5: Reset form
  resetForm();
}
// ResetForm
function resetForm() {
    USERID.id.value='';
    USERID.name.value='';
    USERID.email.value='';
    USERID.password.value='';
    USERID.datepicker.value='';
    USERID.salary.value='';
    USERID.position.value='';
    USERID.hours.value='';
    dom('#btnDong').click()
}
// Hiển thị thông tin
function display(members) {
  let html = "";
  for(let i = 0; i < members.length; i++) {
    let member = new Member(
        members[i].id,
        members[i].name,
        members[i].email,
        members[i].password,
        members[i].datepicker,
        members[i].salary,
        members[i].position,
        members[i].hours,
    );
    html += `
      <tr>
        <td>${member.id}</td>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.datepicker}</td>
        <td>${member.position}</td>
        <td>${member.calcSalary()}</td>
        <td>${member.rank()}</td>

        <td>
        <button
          data-toggle="modal" data-target="#myModal"
          class="btn btn-success"
          onclick="selectMember('${member.id}')"
        >
          Edit
        </button>

        <button
          class="btn btn-danger mt-2"
          onclick="deleteMember('${member.id}')"
        >
          Delete
        </button>
      </td>
      </tr>
    `
  }
  dom("#tableDanhSach").innerHTML = html;

}
// UpdateMember
function updateMember() {
  // B1: DOM lấy thông tin từ các input
  let id = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let datepicker = dom("#datepicker").value;
  let salary = dom("#luongCB").value;
  let position = dom("#chucvu").value;
  let hours = dom("#gioLam").value;

  // B2: Tạo object student chứa các thông tin trên
  let member = new Member(
    id,
    name,
    email,
    password,
    datepicker,
    salary,
    position,
    hours
  );
  // B3: Cập nhật thông tin nhân viên, và lưu trữ vào localStorage
  let index = members.findIndex((item) => {return item.id === member.id });
  members[index] = member;
  // B4: Hiển thị ra giao diện
  display(members);

  // B5: Reset form
  resetForm();
}
// Xóa nhân viên
function deleteMember(memberId) {
  members = members.filter((member) => {
  return member.id !== memberId;
 });
  localStorage.setItem("members", JSON.stringify(members));
  display(members); 
}
// tìm nhân viên
function searchMember() {
    // DOM
    let searchValue = dom("#searchName").value;
    searchValue = searchValue.toLowerCase();

    let newMembers = members.filter((member) => {
        let name = member.rank().toLowerCase();
        // a.includes(b) là hàm kiểm tra b có phải là chuỗi con của a hay không, nếu phải trả ra true
        return name.includes(searchValue);
      });
    
      // Gọi hàm display và truyền vào array mới để hiển thị lên giao diện
      display(newMembers);
    }
// Edit Form 
function selectMember(memberId) {
    // find hoạt động tương tự findIndex, tuy nhiên thay vì trả về index nó trả về giá trị của phần tử
    // nếu không tìm thấy trả về undefined
    let member = members.find((member) => {
      return member.id === memberId;
    });

    if (!member) {
      return;
    }
    dom("#tknv").value = member.id;
    dom("#name").value = member.name;
    dom("#email").value = member.email;
    dom("#password").value = member.password;
    dom("#datepicker").value = member.datepicker;
    dom("#luongCB").value = member.salary;
    dom("#chucvu").value = member.position;
    dom("#gioLam").value = member.hours;
    // khi cập nhật không được thay đổi mã nhân viên và không được thêm nhân viên
    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
}
// Dom
function dom(selector) {
  return document.querySelector(selector);
}

function showtableDanhSach(){
    let members = localStorage.getItem('members');
    members = JSON.parse(members);
    display(members);
}

showtableDanhSach();