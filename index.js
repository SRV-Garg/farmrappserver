var stripe = require('stripe')('sk_test_fICATrIWoop6d3sWprOsq7yF');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded( { extended: false}));
app.use(cors());

router.post('/processpay', function (request, response){
	var stripeToken = request.body.stripetoken;
	var amountPayable = request.body.amount;
	var charge = stripe.charge.create({
		amount: amountPayable,
		currency: 'usd',
		description: 'Sample transaction',
		source: stripeToken
	}, function (err, charge){
		if(err){
			console.log(err);
		}else{
			response.send({ success: true });
		}
	})
})

router.get('/test', function(request, response){
		response.send('Welcome to this API');
	});

app.use(router);
app.listen(process.env.PORT || 3000, function() {
	console.log('Server started');
})