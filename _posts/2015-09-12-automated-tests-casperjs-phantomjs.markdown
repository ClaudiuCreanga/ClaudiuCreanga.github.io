---
layout: post
title:  "Run Magento specific automated tests with PhantomJs and CasperJs"
date:   2015-09-12 23:26:17
categories: magento
description: "Manual testing is boring and takes a long time. This is why most people skip them. For the lazy testers, casper the friendly ghost may come to the rescue."
---
In order to be effective and useful, an automated test should:
<ul class="cool-bullet lists">
<li>be 100% accurate</li>
<li>be scalable</li>
<li>be at least twice as fast as manual testing</li>
<li>be easy to write and run</li>
</ul>

Writing automated tests takes time, time in which you could have done the test manually. So when you write the test keep in mind that you want to reuse it. Tests being very different, you want to make your test as <span class="code">modular</span> as possible. This is very simple with javascript and can simply be done by keeping every test inside a function.

First thing to do is to set a url variable to get it from the command line. Then we set up some viewport sizes based on our media queries and then take screenshots:

{% highlight javascript linenos %}
var BASE_URL = "http://"+casper.cli.get('url');

var viewportSizes = [
    [1500,900],
    [1280,800],
    [1024,768],
    [600,1024],
    [320,568]
]

function screenshots(page){
    casper.each(viewportSizes, function(self, viewportSize, i) {
 
	    // set two vars for the viewport height and width as we loop through each item in the viewport array
	    var width = viewportSize[0],
	        height = viewportSize[1];
	 
	    //give some time for the page to resize
	    casper.wait(1, function() {
	 
	        //set the viewport to the desired height and width
	        this.viewport(width, height);
	 
			casper.viewport(width, height).then(function() {
	 
	              this.capture('screenshots/'+page+'-'+width+'.png')
	
	        });
	    });
    
	});
	casper.viewport(1500,900);
}
{% endhighlight %}

Then we navigate through our site easily with casper, but as modular as possible:

{% highlight javascript linenos %}
function to_homepage(){
	// Go to homepage
	casper.thenClick('.logo', function() {
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Homepage in');
		screenshots("homepage")
	});
}

function login_page(){
	
	// Go to login page
	casper.thenClick('li.login',function() {
		this.test.pass('login page was loaded');
		screenshots("login-page")
	});
}

function register_page(){
	
	//Go to register page
	casper.then(function() {
	    this.click('.register');
		this.test.pass('register page was loaded');
		screenshots("register")
	});
	
	// Register for a new account	
	// Fill login form and submit
	casper.then(function() {
	    this.test.info('Current location is ' + this.getCurrentUrl());
	    this.fill('#form-validate', {
	        'firstname': 'automated',
	        'lastname': 'test',
	        'email': (Math.random()+1).toString(36).substring(7)+'@company.net', //generate a random email
	        'password': 'johndoe123',
	        'confirmation': 'johndoe123'
	    }, true);
		this.test.pass('form populated');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Registered');
		screenshots("register-populated")
	});
}

function account_page(){
	
	// Account dashboard welcome
	casper.then(function() {
	    //this.test.assertTextExists('Hello, stamba stambic!');
		this.test.assertTextExists('Hello, automated test!', 'page body contains "Hello, automated test!"');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Dashboard in');
		screenshots("account-dashboard")
	});
}

function category_page(){
	
	//go to category
	casper.then(function() {
		this.click('#nav-desktop a[data-menu="1"]');
		this.click('.submenu-desktop[data-submenu="1"] a');
	});
	
	//Check category
	casper.then(function() {
		this.test.assertTextExists('Category name');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Main Category loaded ok');
		screenshots("category")
	});
}

function add_product(){
	// Add a product to basket
	casper.thenClick('.category-new-options .small', function() {
		casper.waitForSelector("#mini-cart-buy", function() {
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.assertTextExists('Added to your bag');
			this.test.pass('Product added successfully');
		})
	});
}

function cart_page(){
	
	// Go to cart page
	casper.waitForSelector("#mini-cart-buy, function() {
		casper.thenClick('#mini-cart-buy', function() {
			this.exists('#shopping-cart-totals-table');
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Cart page loaded fine');
			screenshots("cart")
		});
	})
}

function checkout_page(){
	
	// Go to checkout page
	casper.thenClick('.checkout-types > li:nth-child(1) > button:nth-child(1)', function() {
		this.test.assertTextExists('Billing address');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Checkout page loaded ok');
		screenshots("checkout")
	});
}

function order_user_logged(){
	
	// Make a test order
	casper.then(function() {
		casper.capture('screenshots/amazon-search-2.png');
		casper.waitForSelector('#onestepcheckout-form', function() {
			this.fillSelectors('#onestepcheckout-form', {
		        'input[id="billing:firstname"]': 'stamba',
		        'input[id="billing:lastname"]': 'stambic',
		        'input[id="billing:telephone"]': '12344534',
		        'input[id="billing:postcode"]': '432323'
		    }, false);
	    })
		 
	    casper.waitForSelector("#sagepaydirectpro_cc_type", function() {
			this.fillSelectors('#onestepcheckout-form', {
		        '#sagepaydirectpro_cc_owner': 'Fizipit o Moyazoci',
		        'select[id="sagepaydirectpro_cc_type"]': 'VISA',
		        'input[id="no_gift_message"]': true,
		        'input[id="agreement-1"]': true
		    }, true);
	    })
		this.test.pass('form populated');
	});
	
	casper.thenClick("#onestepcheckout-place-order", function(){
		casper.wait(1000, function(){
			casper.capture("screenshots/placingorder.png")
		})
	})
}

function order_user_guest(){
		// Make a test order
	casper.then(function() {
		casper.capture('screenshots/amazon-search-2.png');
		casper.waitForSelector('#onestepcheckout-form', function() {
			this.fillSelectors('#onestepcheckout-form', {
		        'input[id="billing:firstname"]': 'stamba',
		        'input[id="billing:lastname"]': 'stambic',
		        'input[id="billing:street1"]': 'Lambada is a good music'
		    }, false);
	    })
		 
	    casper.waitForSelector("#sagepaydirectpro_cc_type", function() {
			this.fillSelectors('#onestepcheckout-form', {
		        '#sagepaydirectpro_cc_owner': 'Fizipit o Moyazoci',
		        'input[id="no_gift_message"]': true,
		        'input[id="agreement-1"]': true
		    }, true);
	    })
		this.test.pass('form populated');
	});
	
	casper.thenClick("#onestepcheckout-place-order", function(){
		casper.wait(1000, function(){
			casper.capture("screenshots/placingorder.png")
		})
	})
}

function success_page(){
	
	// Order is successful
	casper.then(function() {
		casper.wait(5000, function(){
			screenshots("success")
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('On the success page now');
		})
	});
}
{% endhighlight %}
You can see that we are going from homepage, making an account, adding to cart and submitting and order. This is how we call these functions with casper:

{% highlight javascript linenos %}
casper.start().viewport(800,900).thenOpen(BASE_URL, function() {
	console.log(BASE_URL)
    this.test.pass('Home was loaded');
    
    to_homepage();
    login_page();
    register_page();
	account_page();
	category_page();
	add_product();
	cart_page();
	checkout_page();
	order_user_logged();
	success_page();

	
});

casper.run(function() {
    this.test.done();
});
{% endhighlight %}
As you can see, keeping the test modular enables us to exclude steps by just commenting out the functions called. If we just want to test the login and not the register, comment out the register(). Ideally you would have 10-20 functions for every situation possible and some test classes across all your websites for some dom elements like checkout buttons and add to cart.

In the end, to run this file just type in the command line: <span class="code">casperjs test test.js --url="domain.com"</span>.