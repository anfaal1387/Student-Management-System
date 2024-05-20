import inquirer from 'inquirer';
class student{
    static counter = 10000;
    id: number;
    name: string;
    course: string[];
    balance: number;
    

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.course = []   //Initialize an empty array for courses
        this.balance = 100;
    
    };
    //Method to enroll a student in a course
    enroll_course(course: string){
        this.course.push(course);
    }
    //Method to view a student balance
    view_Balance(balance: number){
        console.log(`Balance for ${this.name} : ${this.balance}`);
    };
    //Method to pay Student fees
    pay_fees(amount:number){
        this.balance = amount;
        console.log(`$${amount}Fees Paid Successfully for ${this.name}`);
    };
    //Method to display student status
    show_status(){
        console.log(`Id: ${this.id}`),
        console.log(`Name: ${this.name}`),
        console.log(`Courses: ${this.course}`),
        console.log(`Balance: ${this.balance}`);
    }
}
//Defining a student_manager class to manage students
class Student_manager{
    students: student[]
    

    constructor(){
        this.students = [];
    }
    //Method to add a new student
    add_student(name: string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(`Student: ${name} added sucessfully, student_Id ${Student.id}`)
    }
    //Method to enroll a student in a course
    enroll_student(student_id: number, course: string){
        let student  = this.students.find(std => std.id === student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully.`);
        };
    }       
    //Method to view a stuent balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
        student.view_Balance;
        }
        else{
            console.log("No Student was found. Please entre a correct student ID");
        }
    };
    //Method to pay the student fees
    pay_student_fees(student_id: number, amount : number){
        let student = this.find_student(student_id);
        if (student){
            student.pay_fees(amount);
        }
    
        else{
        console.log("No Student was found. Please Entre a correct Student ID")
    }
}    
    //Method to display student status
    show_student_status(student_id: number){
        let student = this.find_student(student_id)
        if(student){
            student.show_status();
        }
    };
    //Method to find a student through student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    } 
}
//Main Function to run the program
async function main(){
    console.log("Welcome to the Umme-Anfaal Management System");
    console.log("-".repeat(50));
    
    let student_manager = new Student_manager();
    //While loop to keep program running
    while(true){
        //Asking user to choose an option 
        let choice  = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Please Select An option!",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);


        //Using switch case to handle user choice
        switch(choice.choice){
            case "Add Student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter a Student Name",
                }
            ]);
            student_manager.add_student(name_input.name);
            break;



            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_Id",
                        type: "number",
                        message: "Please Enter your student Id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Please Entre The Course You Want To Enroll In."
                    }
                ]);
                student_manager.enroll_student(course_input.Student_Id, course_input.course);
                break;


                case "View Student Balance":
                    let balance_input = await inquirer.prompt([
                        {
                            name: "Student_Id",
                            type: "input",
                            message: "Please Enter Your Student Id",
                        },
                    ]);
                    student_manager.view_student_balance(balance_input.student_Id);
                    break;



                    case "Pay Fees":
                        let fees_input = await inquirer.prompt([
                            {
                                name: "Student_Id",
                                type: "input",
                                message: "Please Enter Your Student Id",
                            },
                            {
                                name: "amount",
                                type: "input",
                                message: "Please Enter The Amount You Want To Pay"
                            }
                        ]);
                        student_manager.pay_student_fees(fees_input.student_Id, fees_input.amount);
                        break;




                        case "Show Status":
                            let status_input = await inquirer.prompt([
                                {
                                    name: "Student_Id",
                                    type: "input",
                                    message: "Please Enter Your Student_Id",
                                }
                            ]);
                            student_manager.show_student_status(status_input.student_Id);
                            break;



                            case "Exit":
                                console.log("Exiting...");
                                process.exit();


        }

    }
}

//Calling a main Function
main();