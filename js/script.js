console.log("Test");
/**
 * Name field.
 * Name field highlighted as soon as page loads
 */
document.getElementById("name").focus();


 /**
 "Job Role" section
 "Other job Role" field only displays when user selects other from menu.
*/
 const otherJob = document.getElementById("other-job-role");
    otherJob.style.display = "none";

const jobSelect = document.querySelector('#title')

// event listener listens for user to click "other" in job role menu to display previously hidden other job section otherwise "otherJob" section stays hidden  */
jobSelect.addEventListener('change', (event) =>  {
  if(jobSelect.value==='other'){
    otherJob.style.display='';
}
else {otherJob.style.display = "none";
}
});


/**
 * "T-Shirt Info" section
 */
///variables I'm working with: */
const colorSelector = document.querySelector('#color');
const designSelector = document.querySelector('#design');
const option = colorSelector.children
colorSelector.disabled= true;                                   ///disabled prop is a boolean.hides color selector

/// event listener default disables color selector until theme/design is chosen. Once theme/design is chosen only the affliated color in drop down is displayed to the user */ 
designSelector.addEventListener('change',(event) => {
  colorSelector.disabled= false;
   
    for(i=0; i < option.length; i++) {
      let value = designSelector.value;
      let shirtType= option[i].getAttribute("data-theme");

      if(shirtType === value){
      option[i].hidden= 'false'
    } else {
      option[i].selected= 'true'
    }
  }

});


/**
 * "Register for Activities" section.
 */
///variables I'm working with: */
 const registerFieldset = document.querySelector("#activities");
 const activityCost = document.getElementById("activities-cost");
 let defaultCost = 0;


/// Accurately calcualates total $ cost of activities selected and updates for user in real time */
registerFieldset.addEventListener('change',(event) => {
let clickedCost = parseInt(event.target.attributes['data-cost'].value);
  if(event.target.checked) {
    defaultCost += clickedCost;
  } else {
    defaultCost -= clickedCost;
 }
    activityCost.textContent = `Total: $${defaultCost}`;     
 });

/**
 * "Payment Info" section
 */
///variables I'm working with: */
const paymentSelector= document.querySelector('#payment');
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector ("#bitcoin");
const creditCard = document.querySelector("#credit-card");

/// Below made credit card the default option */
paymentSelector[1].selected = true; 
bitcoin.style.display= 'none';
paypal.style.display= 'none';

// Below event listener displays only chosen payment option to user */
paymentSelector.addEventListener('change',(event) =>{
  if(paymentSelector.value === 'Credit Card' ){
    creditCard.style.display ='';
    paypal.style.display ='none';
    bitcoin.style.display ='none';
}else if (paymentSelector.value === 'paypal'){
    paypal.style.display ='';
    creditCard.style.display ='none';
    bitcoin.style.display ='none';
} else if (paymentSelector.value === 'bitcoin'){
    bitcoin.style.display = '';
    paypal.style.display ='none';
    creditCard.style.display ='none';
  }
});



/**
 * Form validation
 */

///variables I'm working with: */
const form = document.querySelector('form');
const Name = document.getElementById("name");
const email = document.getElementById('email');
// const registerFieldset = document.querySelector("#activities"); ... declared above 
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNombre = document.getElementById('cvv');


/* */

/// Name validation */ Format ex: sam */
const nameValidator = () => {
  let nameValue  = Name.value.trim();
  let nameIsValid = /^[A-Za-z]+?\s?[a-zA-Z]+?$/i.test(nameValue);
  return nameIsValid    //returns true or false aka. boolean
};
/// Email validation */ Format ex: sam@bam.com */
function EmailValidator(){
  let emailValue = email.value.trim();
  let emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(emailValue);
  return emailIsValid
};
/// Register for Activities Validation - (1 must be checked here) */
function activitiesValidation(){
  const activitiesBox = document.getElementById('activities-box');
  const activitiesChecked = document.querySelectorAll('[type="checkbox"]:checked');    //psuedo selector// this only checks checkboxes who are checked. 
  if (activitiesChecked.length > 0 ){
    return true
  } else {
    return false
  }
};

/// Card number Validation - field must contain a 13 - 16 digit credit card number with no dashes or spaces */
function cardNumberValidation(){
  let cardValue = cardNumber.value.trim();
  return /^\d{13,16}$/.test(cardValue);
};
/// Zip code Validation - field must contain a 5 digit number */
function zipCodeValidation(){
  let zipCodeValue = zipCode.value.trim();
  return /^\d{5}$/.test(zipCodeValue);
};
/// CVV Validation - field must contain a 3 digit number */
function cvvValidation(){
  let cvvValue = cvvNombre.value.trim(); 
  return /^\d{3}$/.test(cvvValue);
};


/**
 * Accessibility part 1 : errors
 */

//var I'm working with this section  */

///activity section parent element : fieldset or registerFieldset declared above
const nameParent = Name.parentElement;
const emailParent = email.parentElement;
const cardParent = cardNumber.parentElement;
const zipParent = zipCode.parentElement;
const cvvParent = cvvNombre.parentElement;


const activityHint = registerFieldset.lastElementChild;
const nameHint = nameParent.lastElementChild;
const emailhint = emailParent.lastElementChild;
const cardHint = cardParent.lastElementChild;
const zipHint = zipParent.lastElementChild;
const cvvHint = cvvParent.lastElementChild;



/// This section uses listeners to prevent form from submitting if any of the validations above return false *****/
/// Additionally it notifies users via error message of invalid/no entries ****/
form.addEventListener('submit',(event)=> {
  if (!activitiesValidation()) {              //! is not also called function w ().
    event.preventDefault(); 
    registerFieldset.classList.add('not-valid');
    registerFieldset.classList.remove('valid');
    activityHint.style.display= 'block';
  } else {
    registerFieldset.classList.add('valid');
    registerFieldset.classList.remove('not-valid');
    activityHint.style.display = 'none';
  }
  if (!nameValidator()) {
    event.preventDefault(); 
    Name.parentElement.classList.add('not-valid');
    Name.parentElement.classList.remove('valid');
    nameHint.style.display= 'block'; 
  } else{
    Name.parentElement.classList.add('valid');
    Name.parentElement.classList.remove('not-valid');
    nameHint.style.display = 'none';
  }  }); 
  
  form.addEventListener('submit',(event)=> {
  if (!EmailValidator()) {
    event.preventDefault();
    emailParent.classList.add('not-valid');
    emailParent.parentElement.classList.remove('valid');
    emailhint.style.display= 'block';
  } else {
    emailParent.parentElement.classList.add('valid');
    emailParent.parentElement.classList.remove('not-valid');
    emailhint.style.display = 'none';
  }
  if (!cardNumberValidation()) {
    event.preventDefault();
    cardParent.classList.add('not-valid');
    cardParent.parentElement.classList.remove('valid');
    cardHint.style.display= 'block';
  } else {
    cardParent.parentElement.classList.add('valid');
    cardParent.parentElement.classList.remove('not-valid');
    cardHint.style.display = 'none';
  } }); 


  form.addEventListener('submit',(event)=> {
  if (!zipCodeValidation()){
    event.preventDefault();
    zipParent.classList.add('not-valid');
    zipParent.parentElement.classList.remove('valid');
    zipHint.style.display= 'block';
  } else {
    zipParent.classList.add('valid');
    zipParent.classList.remove('not-valid');
    zipHint.style.display= 'none';
  }
  if (!cvvValidation()) {
    event.preventDefault();
    cvvParent.parentElement.classList.add('not-valid');
    cvvParent.parentElement.classList.remove('valid');
    cvvHint.style.display= 'block';
  } else {
    cvvParent.parentElement.classList.add('valid');
    cvvParent.parentElement.classList.remove('not-valid');
    cvvHint.style.display= 'block'; 
  }
});  




/**
 * Accessibility part 2
 */

///Variables I'm working with  */
const activitiesCheckbox = document.querySelectorAll('[type="checkbox"]');

// focus and blur events here allow the user to tab through all options on page inclduing "Register for Activities. */
for (let i=0; i<activitiesCheckbox.length; i++) {
  activitiesCheckbox[i].addEventListener('focus', (event) => {
      event.target.parentNode.classList.add('focus');
  })
  activitiesCheckbox[i].addEventListener('blur', (event) => {
      event.target.parentNode.classList.remove('focus');
  })
}




