const config = require('./config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to fitness_club!'
    });
});

// Export API routes
module.exports = router;

// Define authentication middleware
var authController = require('./controllers/authController');
var AuthValidationMiddleware = require('./middlewares/authValidationMiddlewares');
var PermissionMiddleware = require('./middlewares/authPermissionMiddlewares');

var VerifyUserMiddleware = require('./middlewares/verifyClienteMiddlewares');
var VerifyPalestraMiddleware = require('./middlewares/verifyPalestraMiddlewares');

//--------------------------------------------------------------------------------------------------------------------------------------------------------

//login cliente authentication
router.route('/cliente/login')
    .post(
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        authController.login)

//refresh cliente authentication
router.route('/cliente/login/refresh')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        authController.login)

// Define cliente Controller
var clienteController = require('./controllers/clienteController');

//routes cliente
router.route('/cliente/signup')
    .post(clienteController.new)

router.route('/cliente')
    .get(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        clienteController.view)
    .patch(  
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        clienteController.patchById)
    .put(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        clienteController.patchById)
    .delete(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        clienteController.removeById);

// route per l'admin
router.route('/clienti')
    .get(//AuthValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        clienteController.list)

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// Define prenotazione controller
var prenotazioneControllerCliente = require('./controllers/prenotazioneControllerCliente');
var prenotazioneControllerPalestra = require('./controllers/prenotazioneControllerPalestra');
var prenotazioneController = require('./controllers/prenotazioneController');

// route per l'admin
router.route('/prenotazioni')
    .get(prenotazioneController.index)

// routes prenotazioni cliente
router.route('/cliente/prenotazioni')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerCliente.new)
    .get(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerCliente.view)
    .patch(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerCliente.update)
    .put(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerCliente.update)
    .delete(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerCliente.delete);


//routes prenotazioni dei proprietari
router.route('/palestra/prenotazioni')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.new)
    .get(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.view)
    .patch(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.update)
    .put(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.update)
    .delete(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.delete);
        
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Define palestra Controller
var palestraController = require('./controllers/palestraController');

//routes palestra
router.route('/palestra/signup')
    .post(palestraController.new)

//login cliente authentication
router.route('/palestra/login')
    .post(
        VerifyPalestraMiddleware.hasAuthValidFields,
        VerifyPalestraMiddleware.isPasswordAndUserMatch,
        authController.login)

//refresh cliente authentication
router.route('/palestra/login/refresh')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        authController.login)

router.route('/palestra')
    .get(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        palestraController.view)
    .patch(  
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        palestraController.patchById)
    .put(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        palestraController.patchById)
    .delete(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        palestraController.removeById);

// route per l'admin
router.route('/palestre')
    .get(palestraController.list)

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Define cliente Controller
var segnalazioneController = require('./controllers/segnalazioneController');

// route per la palestra
router.route('/segnalazioni')
    .get(segnalazioneController.index)

//routes cliente segnalazioni
router.route('/cliente/segnalazione')
    .get(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        segnalazioneController.view)
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        segnalazioneController.new)
    .delete(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        segnalazioneController.delete);

// route per palestra segnalazioni
router.route('/palestra/prenotazioni/segnalazione')
    .post(
        AuthValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        prenotazioneControllerPalestra.segnalazione)