
let formDefault = require('../models/frmNameDefaults.json');

const processForm = (req,res,next) => {    
    //Build the configured properties for the form
    let processedFormData = formDefault;     
    
    // Process the form elements and assign them to processedData
    if (typeof(Boolean(req.body.remember)) =='boolean' ) processedFormData.remember = Boolean(req.body.remember);
    if (typeof(req.body.name) == 'string') processedFormData.name = req.body.name;

    console.info(Boolean(req.body.remember));
    //Save the processed data to a persistant cookie or clear an existing cookie
    (processedFormData.remember)?res.cookie('formData',processedFormData):res.clearCookie('formData');
    //send the processed data to the response
    res.locals.formData = processedFormData; 
    next();
};

const getForm = (req, res) => {
    //Set defaults. Check for the cookie or 
    formDefault = (req.cookies.formData !== undefined)?req.cookies.formData:formDefault;
    if (typeof(res.locals.formData) == 'undefined') res.locals.formData = formDefault;

    let message = (res.locals.formData.name == '')?'Hello please enter a name':`Hello ${res.locals.formData.name}!`
    res.render('form', { title: 'Name', message: message });
};

module.exports = {
    processForm,
    getForm
};