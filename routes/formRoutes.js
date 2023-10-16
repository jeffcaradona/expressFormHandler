let express = require('express');
let router = express.Router();

let formController = require('../controllers/formController');


/* GET form page. */
router.get('/',formController.getForm);
/* POST form page process the request then get the form */
router.post('/',formController.processForm,formController.getForm);


module.exports = router;