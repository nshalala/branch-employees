class Company {
    constructor(companyName, branch) {
        this.companyName = companyName;
        this.branch = branch;
        Company.branches.push(branch);
    }
    idCounter = 0;
    employees = [];
    
    static branches = [];

    static displayBranches(){
        let branchSelect = document.getElementById("branchSelect");
        let code = '';
        for (let i = 0; i < this.branches.length; i++) {
            code += `<option value="${i}">${this.branches[i]}</option>`
        }
        branchSelect.innerHTML = code;
        showBranchData();
    }
    display() {
        let companyName = document.getElementById("companyName");
        let companyBranch = document.getElementById("companyBranch");

        companyName.innerHTML = this.companyName;
        companyBranch.innerHTML = this.branch;


        let tbody = document.getElementById("tableBody");

        let codeB = "";
        for (let i = 0; i < this.employees.length; i++) {
            codeB += `<tr class="text-capitalize">
                        <th scope="row">${i + 1}</th>
                        <td scope="row">${this.employees[i].name}</td>
                        <td scope="row">${this.employees[i].surname}</td>
                        <td scope="row">${this.employees[i].position}</td>
                        <td scope="row">${this.employees[i].salary}</td>
                        <td scope="row">
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="deleteEmployee(${
                                this.employees[i].id
                            })">Delete</button>
                        </td>
                    </tr>`;
        }
        tbody.innerHTML = codeB;

        let tfoot = document.getElementById("tableFooter");
        tfoot.innerHTML = `<tr>
                                <th scope="row" class="container fixed-bottom">Total employees: ${this.employees.length}</th>
                            </tr>`;
    }
    add(name, surname, position, salary) {
        let employee = {
            id: this.idCounter,
            name: name,
            surname: surname,
            position: position,
            salary: salary,
        };
        this.idCounter++;
        this.employees.push(employee);
        this.display();
    }
    delete(employee){
        let index = this.employees.indexOf(employee);
        this.employees.splice(index, 1);
        this.display();
    }
}

let code28may = new Company("Code Academy", "28 May");
let codeNizami = new Company("Code Academy", "Nizami");
Company.displayBranches();


function addEmployee() {
    let name = document.getElementById("empName").value.trim();
    let surname = document.getElementById("empSurname").value.trim();
    let position = document.getElementById("empPosition").value;
    let salary = document.getElementById("empSalary").value;

    if (name == "" || surname == "" || position == "position" || salary == "") {
        alert("Please, fill all fields!");
    }else if(salary <= 0){
        alert("Salary must be more than 0!")
    }
     else {
        let branch = document.getElementById("branchSelect").value;
        if (branch == 0) code28may.add(name, surname, position, salary);
        else codeNizami.add(name, surname, position, salary);
        resetInputs();
    }
}

function deleteEmployee(id) {
    let bValue = document.getElementById("branchSelect").value;
    branch = (bValue == 0) ? code28may : codeNizami;
    let employee = branch.employees.find((emp) => emp.id == id);
    let isSure = confirm(`Are you sure to delete employee: ${employee.name} ${employee.surname}?`);
    if (isSure) {
        branch.delete(employee);
    }
}

function resetInputs() {
    document.getElementById("empName").value = "";
    document.getElementById("empSurname").value = "";
    document.getElementById("empPosition").value = "position";
    document.getElementById("empSalary").value = "";
}

function showBranchData() {
    let branch = document.getElementById("branchSelect").value;
    if (branch == 0) code28may.display();
    else codeNizami.display();
}