const init = function () {
  if (document.forms.length === 0) return;

  document.getElementById("submit").addEventListener("click", submit);
};

const submit = function (e) {
  let contactName = document.getElementById("contactName").value;
  let contactNumber = document.getElementById("contactNumber").value;
  let email = document.getElementById("email").value;
  let vehilceModel = document.getElementById("vehilceModel").value;
  let vehicleReg = document.getElementById("vehicleReg").value;
  let mileage = document.getElementById("mileage").value;
  let postalCode = document.getElementById("postalCode").value;
  let comments = document.getElementById("comments").value;

  if (!contactNumber || !email) return;

  let body = JSON.stringify({
    subject: `Quote`,
    contactName,
    contactNumber,
    email,
    vehilceModel,
    vehicleReg,
    mileage,
    postalCode,
    comments,
  });

  e.preventDefault();
  e.stopPropagation();

  let status = document.getElementById("status");

  status.textContent = "Submitting, please stand by...";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  fetch(`https://sellthewhip.herokuapp.com/api/v1/mail/quote`, options)
    .then((res) => res.json() || res)
    .then((data) => {
      if (data.success) {
        status.textContent = "Submitted successfully. Thank you!";
        status.classList.add("text-green-500");
        document.getElementById(document.forms[0].id).reset();
        return;
      }

      status.textContent =
        "An error occurred while trying to submit. Please try again later.";
      status.classList.add("text-red-500");
    })
    .catch(() => {
      status.textContent =
        "An error occurred while trying to submit. Please try again later.";

      status.classList.add("text-red-500");
    });
};

document.addEventListener("DOMContentLoaded", init);
