const baseURL = 'http://localhost:8080/api/v1'
const headers = {"Content-Type":"application/json"}

let userId = 0
let permission = -1

if (document.cookie) {
    const cookieArr = document.cookie.split(";")
    userId = +cookieArr[0].split("=")[1]
    permission = +cookieArr[1].split("=")[1]
}

function handleLogout() {
    let c = document.cookie.split(";")
    for (let i in c) {
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
    location.reload();
}

function openNav() {
    document.getElementById('nav-menu').style.width = '40vw'
}

function closeNav() {
    document.getElementById('nav-menu').style.width = '0'
}

function convertDateStringToDay(dateString) {
    let dateSringAsDate = new Date(dateString)
    return (dateSringAsDate.getMonth() + 1) + '/' + dateSringAsDate.getDate() + '/' + dateSringAsDate.getFullYear()
}

function convertDateStringToTime(dateString) {
    const dateSringAsDate = new Date(dateString)
    let hour = dateSringAsDate.getHours()
    let meridiem = 'am'
    if (hour > 12) {
        hour -= 12
        meridiem = 'pm'
    }

    return hour + ':' + String(dateSringAsDate.getMinutes()).padStart(2, '0') + meridiem
}

async function getInstructorCourses() {
    await fetch(`${baseURL}/courses/instructor/${userId}`, {
        method: "GET",
        headers
    })
    .then(res => res.json())
    .then(data => displayYourCourses(data, true))
    .catch(err => console.log(err))
}

async function getUserAsStudents() {
    await fetch(`${baseURL}/students/user/${userId}`, {
        method: "GET",
        headers
    })
    .then(res => res.json())
    .then(data => getCoursesWhereUserIsStudent(data))
    .catch(err => console.log(err))
}

function getCoursesWhereUserIsStudent(students) {
    const courses = []
    for (let student of students) {
        courses.push(student.course)
    }
    displayYourCourses(courses, false)
}

function displayYourCourses(courses, isInstructor) {
    for (const course of courses) {
        const card = document.createElement('div')
        card.classList.add('container')
        card.classList.add('course-container')

        card.innerHTML = `
            <img class="course-card-img" src="${course.imageURL}">
            <p>Name: ${course.name}</p>
            <p>Size: ${course.size}</p>
            <p>Location: ${course.location}</p>
            <p>Instructor: </p>
            <p>${course.description}</p>
            <p>
            ${convertDateStringToDay(course.startTime)} 
            ${convertDateStringToTime(course.startTime)} - ${convertDateStringToTime(course.endTime)}
            </p>`
            + (isInstructor ? '<p>You are the instructor of this course.</p>' : '')
            + `<button class="btn btn-primary" onclick="">Info</button>
        `

        document.getElementById('your-course-section').appendChild(card)
    }
}

if (userId) {
    document.querySelector('#nav-menu .overlay-content').innerHTML = `
        <a href="#" onclick="handleLogout()">Log Out</a>
    `
} else {
    document.querySelector('#nav-menu .overlay-content').innerHTML = `
        <a href="./login.html">Login</a>
        <a href="./register.html">Register</a>
    `
}

getInstructorCourses()
getUserAsStudents()