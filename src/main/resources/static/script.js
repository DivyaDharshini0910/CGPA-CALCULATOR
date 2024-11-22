document.getElementById("add-course-btn").addEventListener("click", function () {
    const courseContainer = document.getElementById("course-container");

    const newCourse = document.createElement("div");
    newCourse.classList.add("course");

    newCourse.innerHTML = `
        <input type="number" placeholder="Grade (e.g., 9)" class="grade" required>
        <input type="number" placeholder="Credits" class="credit" required>
        <button type="button" class="remove-btn" onclick="removeCourse(this)">Remove</button>
    `;

    courseContainer.appendChild(newCourse);
});

function removeCourse(button) {
    button.parentElement.remove();
}

document.getElementById("cgpa-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");

    const courses = [];
    grades.forEach((gradeInput, index) => {
        const grade = parseFloat(gradeInput.value);
        const credit = parseFloat(credits[index].value);

        if (!isNaN(grade) && !isNaN(credit)) {
            courses.push({
                studentName: "John Doe", // Replace with dynamic input if needed
                courseName: `Course ${index + 1}`,
                grade: grade,
                credits: credit,
            });
        }
    });

    if (courses.length === 0) {
        alert("Please add valid grades and credits.");
        return;
    }

    try {
        // Send the courses to the backend API
        const response = await fetch("/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courses),
        });

        if (!response.ok) {
            throw new Error("Failed to save courses to the database.");
        }

        const savedCourses = await response.json();
        console.log("Saved courses to database:", savedCourses);

        // Calculate CGPA locally
        const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
        const weightedSum = courses.reduce((sum, course) => sum + course.grade * course.credits, 0);
        const cgpa = totalCredits ? (weightedSum / totalCredits).toFixed(2) : 0;

        document.getElementById("cgpa").textContent = cgpa;
        document.getElementById("result").style.display = "block";
    } catch (error) {
        console.error("Error saving courses:", error);
        alert("An error occurred while saving courses to the database.");
    }
});
