const studentForm = document.getElementById("student-form");
const name = document.getElementById("name");
const mobile = document.getElementById("mobile");
const address = document.getElementById("address");
const studentList = document.getElementById("student-list");
const button = document.getElementById("submit-btn");
const studentCount = document.getElementById("student-count");

let students = [];
let editId = null;

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = event.name.value.trim();
  const mobileValue = event.mobile.value.trim();
  const addressValue = event.address.value.trim();

  if (nameValue === "" || mobileValue === "" || addressValue === "") {
    alert("Please enter all student details");
    return;
  }

  if (editId !== null) {
    const student = students.find(function (item) {
      return item.id === editId;
    });

    student.name = nameValue;
    student.mobile = mobileValue;
    student.address = addressValue;

    editId = null;
    button.textContent = "Add Student";
  } else {
    const newStudent = {
      id: Date.now(),
      name: nameValue,
      mobile: mobileValue,
      address: addressValue,
    };

    students.push(newStudent);
  }

  displayStudents();
  studentForm.reset();
});

function displayStudents() {
  studentList.innerHTML = "";

  studentCount.textContent = "Total Students: " + students.length;

  students.forEach(function (item, index) {
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2";

    const details = document.createElement("div");
    details.className = "student-details";

    const title = document.createElement("h5");
    title.textContent = index + 1 + ". " + item.name;

    const mobileText = document.createElement("p");
    mobileText.textContent = item.mobile;

    const addressText = document.createElement("p");
    addressText.textContent = item.address;

    details.appendChild(title);
    details.appendChild(mobileText);
    details.appendChild(addressText);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-warning btn-sm me-2";

    editButton.addEventListener("click", function () {
      editStudent(item.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";

    deleteButton.addEventListener("click", function () {
      deleteStudent(item.id);
    });

    details.appendChild(editButton);
    details.appendChild(deleteButton);

    li.appendChild(details);
    studentList.appendChild(li);
  });
}

function editStudent(id) {
  const student = students.find(function (item) {
    return item.id === id;
  });

  if (!student) {
    return;
  }

  name.value = student.name;
  mobile.value = student.mobile;
  address.value = student.address;

  editId = id;
  button.textContent = "Update Student";

  studentForm.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function deleteStudent(id) {
  students = students.filter(function (item) {
    return item.id !== id;
  });

  if (editId === id) {
    editId = null;
    studentForm.reset();
    button.textContent = "Add Student";
  }

  displayStudents();
}
