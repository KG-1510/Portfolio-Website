//Default Display - Skills Section
document.getElementById("exp-content").style.display = "none";
document.getElementById("skills-content").style.display = "block";
document.getElementById("edu-content").style.display = "none";
document.getElementById("skills-menu").style.color = "#2098d1";

//Functions on click
function showExp() {
    document.getElementById("exp-content").style.display = "block";

    document.getElementById("skills-content").style.display = "none";

    document.getElementById("edu-content").style.display = "none";

    document.getElementById("exp-menu").style.color = "#2098d1";
    document.getElementById("skills-menu").style.color = "#bbe1fa";
    document.getElementById("edu-menu").style.color = "#bbe1fa";
}
function showSkills() {

    document.getElementById("exp-content").style.display = "none";

    document.getElementById("skills-content").style.display = "block";

    document.getElementById("edu-content").style.display = "none";

    document.getElementById("skills-menu").style.color = "#2098d1";
    document.getElementById("exp-menu").style.color = "#bbe1fa";
    document.getElementById("edu-menu").style.color = "#bbe1fa";
}
function showEdu() {
    document.getElementById("exp-content").style.display = "none";

    document.getElementById("skills-content").style.display = "none";

    document.getElementById("edu-content").style.display = "block";

    document.getElementById("edu-menu").style.color = "#2098d1";
    document.getElementById("exp-menu").style.color = "#bbe1fa";
    document.getElementById("skills-menu").style.color = "#bbe1fa";
}