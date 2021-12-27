export const choose = () => {
    var checkboxs = document.querySelectorAll("input[type=checkbox]");
    var labels = document.querySelectorAll(".checkbox-label");
    for (let i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked === true) {
            labels[i].classList.add("checked");
        } else {
            labels[i].classList.remove("checked");
        }
    }
};
