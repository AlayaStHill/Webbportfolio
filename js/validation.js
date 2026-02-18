/* Generisk validering
data-error = texten som ska visas
<p> = platsen där den visas */

/* hämtar alla element som har attributet data-field. 
   querySelectorAll returnerar alltid en NodeList ([]) = samling html-element */
const fields = document.querySelectorAll("[data-field]");

// Validera fält-funktion som styr om felmeddelande ska visas. input = parameter html-elementet
const validateField = (input) => {
  /* 1. hämtar input data-field värde ex. firstname. Ersätter {input.data....} 
       2. hämtar tillhörande p via #error-${firstname}. errorElement = p 
       dataset är en inbyggd egenskap i html-element, representerar alla attribut som börjar med data- */
  const errorElement = document.querySelector(`#error-${input.dataset.field}`);

  // hämtar ut texten från data-error och tilldelar errorMessage felmeddelandet. Ex. Fältet Förnamn...
  const errorMessage = input.dataset.error;

  const formGroup = input.closest(".form-group");

  /* value = inbyggd element-egenskap
       input.value = det användaren skrivit. Ta bort mellanslag i början/slutet */
  const value = input.value.trim();

  // === Tomt fält-validering ===
  if (value.length === 0) {
    errorElement.innerText = errorMessage;
    input.classList.add("has-error");
    formGroup.classList.add("has-error");

    // bestämmer att validateField-metoden returnerar en bool. false = fältet är ej godkänt
    return false;
  }

  // === Email validering ===
  // 3st === värdet + datatyp lika
  if (input.dataset.field === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // test = funktion returnerar bool. Inparameter value
    if (!emailPattern.test(value)) {
      errorElement.innerText = errorMessage;
      input.classList.add("error");
      formGroup.classList.add("has-error");

      return false;
    }
  }

  // Om fältet är korrekt ifyllt
  errorElement.innerText = "";
  input.classList.remove("has-error");
  formGroup.classList.remove("has-error");

  return true;
};

// kör validateField på keyup/blur och sätt innerText, eller ej
fields.forEach((input) => {
  {
    // kör validateField varje gång användaren skriver eller lämnar fältet (= blur)
    input.addEventListener("keyup", () => validateField(input));

    input.addEventListener("blur", () => validateField(input));
    // validateField returnerar true eller false.
  }
});

/* e = eventobjekt, skapas automatiskt av webbläsaren när ett event triggas, ex. submit.
  e innehåller information om eventet, ex. vilket element och används (preventDefault) för
  att hindra webbläsarens standardbeteende - att skicka formuläret. */
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault(); // stoppar Web3Forms standard-sida

  let isValid = true;

  /* Anropar funktionen validateField vid submit.
       validateField kontrollerar alla fält igen. Om ett enda fält är ogiltigt, isValid = false. */
  fields.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  // om något är ogiltigt, formuläret skickas ej
  if (!isValid) return;

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const successMessage = document.querySelector("#contact-success");

      // töm formuläret
      form.reset();

      // visa success-text
      successMessage.hidden = false;

      // gör texten synlig för hjälpmedel, fokusbar via js - behövs för att focus() ska fungera
      successMessage.setAttribute("tabindex", "-1");
      // flyttar fokus till meddelandet så att feedbacken uppmärksammas av hjälpmedel
      successMessage.focus();

      // scrolla till success-texten
      successMessage.scrollIntoView();

      // dölj efter 8 sek
      setTimeout(() => {
        successMessage.hidden = true;
        successMessage.removeAttribute("tabindex");
      }, 8000);
    }
  } catch (error) {
    console.error("Form submission error:", error);
  }
});
