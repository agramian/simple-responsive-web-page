// global variables
var defaultNumColumns = 3;
var imageFolderPath = "images/";
var over480 = window.matchMedia("(min-width: 480px)");
var under480 = window.matchMedia("(max-width: 479px)");
var navBarButtonWidth;
// insert footer text
var footer = "Copyright 2013 Mister Softee. All Rights Reserved.";
function insertFooterText() {
	document.getElementById("footerContent").innerHTML = footer; 
};
// hero bar content
var heroBarText = "I Scream, You Scream, We All Scream for Ice Cream!";
var heroBarImage = "hero_image.png";
function insertHeroContent() {
	document.getElementById("heroBar").style.backgroundImage = "url('" + imageFolderPath + heroBarImage + "')";
	document.getElementById("heroTextContent").innerHTML = heroBarText;
};
// content object
function content(title, text, image)
{
	this.title = title || "title";
	this.text = text || "text";
	this.image = image || "column_image_not_found.png";
};
// allContent object
var allContent = {
	// list of content objects
	contentList: [],
	// add a content object to allContent
	add: function(newContent) {
		this.contentList.push(newContent);
	},
	// remove a content object from allContent
	remove: function(contentToRemove) {
		var idx = this.contentList.indexOf(contentToRemove);
		if (idx != -1) {
			this.contentList.splice(idx,1);
		}
	},
	// populate content div with the content
	populate: function(numColumns) {
		numColumns = numColumns || defaultNumColumns;
		var contentString = "";
		for (var i = 0; (i < numColumns) && (i < this.contentList.length); i++) {
			contentString += '<div class="contentColumn ' + ( ((i+1) % 2 == 0) ? 'contentColumnEven' : 'contentColumnOdd') + '">';
			contentString += '<div class="columnImage" style="background-image:url(\'' + imageFolderPath + this.contentList[i].image + '\');"></div>';
			contentString += '<div class="columnTitle">' + this.contentList[i].title + '</div>';
			contentString += '<div class="columnText">' + this.contentList[i].text + '</div>';
			contentString += '</div>';
		}
		document.getElementById("content").innerHTML = contentString;
	}
};
// create content objects and add to allContent
var column1 = new content("Weekly Favorite Flavors",
							"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
							"column_1_image.png");
allContent.add(column1);
var column2 = new content("History of Us",
							"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
							"column_2_image.png");
allContent.add(column2);
var column3 = new content("Weekly Favorite Flavors",
							"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
							"column_3_image.png");
allContent.add(column3);
// function called once body is loaded
function initializePageContent() 
{
	// add navigation bar
	navigationBar.addToPage();
	navigationBar.updateState();
	// hero bar
	insertHeroContent();
	// populate content div
	allContent.populate();
	// footer text
	insertFooterText();
	// if matchMedia is available with the current browser,
	// handle the extra credit cases
	if (matchMedia) {
		over480.addListener(handleResizeOver480);
		under480.addListener(handleResizeUnder480);
		// call them once to get it set initially
		handleResizeOver480(over480);
		handleResizeUnder480(under480);
	}
};
// navigation bar
function navigationButton(text, parentButton)
{
	this.text = text || "Button";
	this.parentButton = parentButton || undefined;
	this.toggled = false; // for mobile stacked navigation
	this.subButtons = [];
	this.addSubButton = function(button) {
		this.subButtons.push(button);
	};
	this.removeSubButton = function(button) {
		var idx = this.subButtons.indexOf(button);
		if (idx != -1) {
			this.subButtons.splice(idx,1);
		}
	};
};
var navigationBar = {
	currentState: "Home",
	usingMobileNav: false,
	mobileNavToggled: false,
	activeBgAndTextColor: ["#fea210","#FFF"],
	hoverBgAndTextColor: ["#df8901","#FFF"],
	outBgAndTextColor: ["#FFF","#a9a5a1"],
	buttonList: [],
	// add a button to the navigation bar
	addButton: function(button) {
		this.buttonList.push(button);
	},
	// remove a button from the navigation bar
	removeButton: function(button) {
		var idx = this.buttonList.indexOf(button);
		if (idx != -1) {
			this.buttonList.splice(idx,1);
		}
	},
	// handle the button mouse over event
	handleOver: function(e) {
		button = eval(e.id.toLowerCase() + "Button");
		// if button has a parent button,
		// iterate through parent button and show all children
		if (button.parentButton) {
			for (var i = 0; i < button.parentButton.subButtons.length; i++) {
				document.getElementById(button.parentButton.subButtons[i].text).style.display="block";
			}
		}
		currentStateButton = eval(this.currentState.toLowerCase() + "Button");
		// apply hover color change effect
		// if this is not the active button
		if (e.id != this.currentState) {
			e.style.backgroundColor=this.hoverBgAndTextColor[0];
			e.style.color=this.hoverBgAndTextColor[1];
		}
		// display all subButtons if any
		for (var i = 0; i < button.subButtons.length; i++) {
			document.getElementById(button.subButtons[i].text).style.display="block";
		}
	},
	// handle the button mouse out event
	handleOut: function(e) {
		button = eval(e.id.toLowerCase() + "Button");
		currentStateButton = eval(this.currentState.toLowerCase() + "Button");
		// if this is not the active button apply the effect
		if (e.id != this.currentState) {
			// if the current active button doesn't have a parent
			// OR if it does have a parent, but the parent is not the active state,
			// apply the out color effect 
			if (!currentStateButton.parentButton
				|| currentStateButton.parentButton.text != e.id) {
				e.style.backgroundColor=this.outBgAndTextColor[0];
				e.style.color=this.outBgAndTextColor[1];
			}
			// the current button's parent is the active state,
			// so return it to the active state color
			else {
				e.style.backgroundColor=this.activeBgAndTextColor[0];
				e.style.color=this.activeBgAndTextColor[1];				
			}
		}
		// hide all subButtons if any
		for (var i = 0; i < button.subButtons.length; i++) {
			document.getElementById(button.subButtons[i].text).style.display="none";
		}
		// if the button has a parent, hide all the children under the parent
		if (button.parentButton) {
			for (var i = 0; i < button.parentButton.subButtons.length; i++) {
				document.getElementById(button.parentButton.subButtons[i].text).style.display="none";
			}			
		}
	},
	// handle the button click event
	handleClick: function(e) {
		this.updateState(e.id);	
		for (var i = 0; i < button.subButtons.length; i++) {
			document.getElementById(button.subButtons[i].text).style.display="none";
		}	
	},
	// contruct and return a div containing the button
	// with the necessary attributes
	getButtonHtml: function(buttonText, visible) {
		if (visible === undefined) {
			visible = true;
		}
		var buttonString = "";
		buttonString += '<div id="' + buttonText +'" class="topBarElement navigationButton" ';
		buttonString += 'onclick="navigationBar.handleClick(this)"';
		buttonString += ' onmouseover="navigationBar.handleOver(this)"';
		buttonString += ' onmouseout="navigationBar.handleOut(this)"';
		if (!visible) {
			buttonString += ' style="display:none"';
		}
		buttonString += '>';
		buttonString += buttonText + '</div>';
		return buttonString;		
	},
	// construct an html string containing the navigation bar
	// and add it to the page
	addToPage: function() {
		var contentString = "";
		for (var i = 0; i < this.buttonList.length; i++) {
			contentString += '<div class="navigationButtonContainer topBarElement">';
			contentString += this.getButtonHtml(this.buttonList[i].text);
			if (this.buttonList[i].subButtons.length > 0) {
				for (var j = 0; j < this.buttonList[i].subButtons.length; j++) {
					contentString += this.getButtonHtml(this.buttonList[i].subButtons[j].text, false);
				}
			}
			contentString += '</div>';
		}
		document.getElementById("navigationBar").innerHTML = contentString;	
	},
	// handle the button click event for mobile
	handleToggleClick: function(e) {
		// handle main navigation button
		if (e.id == "mobileNavigationButton") {
			// if the button was already toggled,
			// hide all the navigation bar buttons
			// and adjust the color
			if (this.mobileNavToggled) {
				this.mobileNavToggled = false;
				e.style.backgroundColor=this.outBgAndTextColor[0];
				e.style.color=this.outBgAndTextColor[1];
				document.getElementById("navigationBar").style.display = "none";
			}
			// if the button is not toggled,
			// show all the navigation bar buttons
			// and adjust the color
			else {
				this.mobileNavToggled = true;
				e.style.backgroundColor=this.hoverBgAndTextColor[0];
				e.style.color=this.hoverBgAndTextColor[1];
				document.getElementById("navigationBar").style.display = "inline-block";
			}
		}
		// handle other  buttons
		else {
			var button = eval(e.id.toLowerCase() + "Button");
			// handle navigation bar buttons
			// with sub buttons separately
			if (button.subButtons.length > 0) {
				// if the parent button has been toggled
				if (button.toggled) {
					// a second click chooses that page if it
					// is not the current state
					if (this.currentState != e.id){
						this.updateState(e.id);
						return;
					}
					// if the parent button is already the current state,
					// hide all the sub buttons
					else {
						button.toggled = false;
						for (var i = 0; i < button.subButtons.length; i++) {
							document.getElementById(button.subButtons[i].text).style.display="none";
						}	
					}					
				}
				// if the parent button has not been toggled,
				// show all the sub buttons
				else {
					button.toggled = true;
					for (var i = 0; i < button.subButtons.length; i++) {
						document.getElementById(button.subButtons[i].text).style.display="inline-block";
					}
				}
			}
			// just update the state
			else {
				this.updateState(e.id);
			}	
		}
	},
	// adjust the event triggers for stacked mobile navigation
	enableMobileNavigation: function() {
		// create add the mobile button to the DOM
		// if it does not exist
		if (!document.getElementById("mobileNavigationButton")) {
			var mobileButton = createNewElement("div", "mobileNavigationButton", ["topBarElement"]);
			mobileButton.style.width = "30%";
			addElementAfter(mobileButton, document.getElementById("logo"));
			document.getElementById("navigationBar").style.display = "none";
			addAttrToElement("onclick", "navigationBar.handleToggleClick(this)", mobileButton);
		}
		this.usingMobileNav = true;
		this.mobileNavToggled = false;
		// adjust the event attributes
		for (var i = 0; i < this.buttonList.length; i++) {
			var buttonElement = document.getElementById(this.buttonList[i].text);
			removeAttrsFromElement(["onclick","onmouseover","onmouseout"], buttonElement);
			addAttrToElement("onclick", "navigationBar.handleToggleClick(this)", buttonElement);
			for (var j = 0; j < this.buttonList[i].subButtons.length; j++) {
				buttonElement = document.getElementById(this.buttonList[i].subButtons[j].text);
				removeAttrsFromElement(["onclick","onmouseover","onmouseout"], buttonElement);
				addAttrToElement("onclick", "navigationBar.handleToggleClick(this)", buttonElement);
			}
		}
		// if the currentState is a sub button,
		// set the parent button to toggled and show the sub buttons
		currentStateButton = eval(this.currentState.toLowerCase() + "Button");
		if (currentStateButton.parentButton) {
			currentStateButton.parentButton.toggled = false;
			this.handleToggleClick(document.getElementById(currentStateButton.parentButton.text));
		}
		// if the currentState is a parent button,
		// reset it's toggled field to false
		else if (currentStateButton.subButtons.length > 0) {
			currentStateButton.toggled = false;
		}
	},
	// adjust the event triggers for normal navigation
	enableNormalNavigation: function() {
		// remove the mobile navigation button
		removeElementById("mobileNavigationButton");
		document.getElementById("navigationBar").style.display = "inline-block";
		this.usingMobileNav = false;
		this.mobileNavToggled = false;
		// adjust the event attributes
		for (var i = 0; i < this.buttonList.length; i++) {
			var buttonElement = document.getElementById(this.buttonList[i].text);
			removeAttrsFromElement(["onclick","onmouseover","onmouseout"], buttonElement);
			if (this.currentState != this.buttonList[i].text) {
				addAttrToElement("onclick", "navigationBar.handleClick(this)", buttonElement);
			}
			addAttrToElement("onmouseover", "navigationBar.handleOver(this)", buttonElement);
			addAttrToElement("onmouseout", "navigationBar.handleOut(this)", buttonElement);
			for (var j = 0; j < this.buttonList[i].subButtons.length; j++) {
				buttonElement = document.getElementById(this.buttonList[i].subButtons[j].text);
				removeAttrsFromElement(["onclick","onmouseover","onmouseout"], buttonElement);
				if (this.currentState != this.buttonList[i].subButtons[j].text) {
					addAttrToElement("onclick", "navigationBar.handleClick(this)", buttonElement);
				}
				addAttrToElement("onmouseover", "navigationBar.handleOver(this)", buttonElement);
				addAttrToElement("onmouseout", "navigationBar.handleOut(this)", buttonElement);
				buttonElement.style.display="none";		
			}			
		}		
	},
	// update the state of the site
	// called when a navigation bar button is clicked
	// for now just makes the clicked button show as the active state
	// by changing it's colors
	updateState: function(newState) {
		if (newState) {
			// get the current state element and update it's colors and event triggers
			var oldStateElement = document.getElementById(this.currentState);
			oldStateElement.style.backgroundColor=this.outBgAndTextColor[0];
			oldStateElement.style.color=this.outBgAndTextColor[1];
			// only update these events if using normal navigation
			if (!this.usingMobileNav) {
				addAttrToElement("onclick", "navigationBar.handleClick(this)", oldStateElement);
				addAttrToElement("onmouseover", "navigationBar.handleOver(this)", oldStateElement);
				addAttrToElement("onmouseout", "navigationBar.handleOut(this)", oldStateElement);
			}
			// if the current state element has a parent, update the parent too
			var oldStateButton = eval(this.currentState.toLowerCase() + "Button");
			if (oldStateButton && oldStateButton.parentButton) {
				var parentElement = document.getElementById(oldStateButton.parentButton.text);
				parentElement.style.backgroundColor=this.outBgAndTextColor[0];
				parentElement.style.color=this.outBgAndTextColor[1];
				// only update these events if using normal navigation
				if (!this.usingMobileNav) {
					addAttrToElement("onclick", "navigationBar.handleClick(this)", parentElement);
					addAttrToElement("onmouseover", "navigationBar.handleOver(this)", parentElement);
					addAttrToElement("onmouseout", "navigationBar.handleOut(this)", parentElement);
				}	
			}
			this.currentState = newState;
		}
		currentStateElement = document.getElementById(this.currentState);
		button = eval(this.currentState.toLowerCase() + "Button");
		// only update these events if using normal navigation
		if (!this.usingMobileNav) {
			// if the new state button has sub buttons, then only remove the click event
			if (button.subButtons.length > 0) {
				removeAttrsFromElement(["onclick"], currentStateElement);
			}
			// otherwise remove click, mouseover, and mouseout events
			else {
				removeAttrsFromElement(["onclick","onmouseover","onmouseout"], currentStateElement);	
			}
		}
		// update the color scheme for the new state element
		currentStateElement.style.backgroundColor=this.activeBgAndTextColor[0];
		currentStateElement.style.color=this.activeBgAndTextColor[1];
		// if the new state element has a parent, update the parent color scheme also
		// because the sub button is not available in the main navigation bar so if the
		// parent appears active then it shows that something underneath the parent is active
		if (button && button.parentButton) {
			document.getElementById(button.parentButton.text).style.backgroundColor=this.activeBgAndTextColor[0];
			document.getElementById(button.parentButton.text).style.color=this.activeBgAndTextColor[1];
			// only update these events if using normal navigation
			if (!this.usingMobileNav) {
				addAttrToElement("onmouseover", "navigationBar.handleOver(this)", currentStateElement);
				for (var i = 0; i < button.parentButton.subButtons.length; i++) {
					document.getElementById(button.parentButton.subButtons[i].text).style.display="none";
				}
			}			
		}
	}
};
// create navigation button objects and add them to the navigationBar
var homeButton = new navigationButton("Home");
var locationsButton = new navigationButton("Locations");
var storesButton = new navigationButton("Stores",locationsButton);
var trucksButton = new navigationButton("Trucks",locationsButton);
var officesButton = new navigationButton("Offices",locationsButton);
locationsButton.addSubButton(storesButton);
locationsButton.addSubButton(trucksButton);
locationsButton.addSubButton(officesButton);
var aboutButton = new navigationButton("About");
var contactButton = new navigationButton("Contact");
navigationBar.addButton(homeButton);
navigationBar.addButton(locationsButton);
navigationBar.addButton(aboutButton);
navigationBar.addButton(contactButton);
navBarButtonWidth = (100/navigationBar.buttonList.length).toString() + "%";
// handle resizing changes
function handleResizeOver480(mediaQuery) {
	if (mediaQuery.matches) {
		navigationBar.enableNormalNavigation();
		changeCssForClass("width","navigationButtonContainer", navBarButtonWidth);
		document.getElementById("logo").style.width="50%";
		document.getElementById("logo").style.height="100%";
		changeCssForClass("width","contentColumn", "30%");
		document.getElementById("topBar").style.height="100px";
		document.getElementById("navigationBar").style.width="50%";
	}
}
function handleResizeUnder480(mediaQuery) {
	if (mediaQuery.matches) {
		navigationBar.enableMobileNavigation();
		changeCssForClass("width","navigationButtonContainer", "100%");
		document.getElementById("logo").style.width="70%";
		document.getElementById("logo").style.height="100px";
		changeCssForClass("width","contentColumn", "97%");
		document.getElementById("topBar").style.height="100%";
		document.getElementById("navigationBar").style.width="100%";
	}
}
// change css for all elements with class
function changeCssForClass(cssProperty, className, newPropertyValue) {
  var elements =  document.getElementsByClassName(className);
  for(i=0; i<elements.length; i++) {
    elements[i].style[cssProperty] = newPropertyValue;
  }
}
// add attribute to element
function addAttrToElement(attrName, attrValue, element) {
	var attr=document.createAttribute(attrName);
	attr.nodeValue=attrValue;
	element.attributes.setNamedItem(attr);
};
// remove attribute from element
function removeAttrsFromElement(attrNames, element) {
	for (var i=0; i < attrNames.length; i++) {
		element.removeAttribute(attrNames[i]);
	}
};
// create new element
function createNewElement(tag, id, classes, html) {
	var newElement = document.createElement(tag);
	if (id) newElement.id = id;
	if (classes) {
		/*var classString = "";
		if (classes instanceof Array) {
			
		}*/
		newElement.className = classes.join( );
	}
	if (html) newElement.innerHTML = html;
	return newElement;
}
// add element before another node
function addElementBefore(element, referenceNode)
{
	referenceNode.parentNode.insertBefore(element,referenceNode);
}
// add element after another node
function addElementAfter(element, referenceNode)
{
	referenceNode.parentNode.insertBefore(element,referenceNode.nextSibling);
}
// remove element by id
function removeElementById(id) {
	var element = document.getElementById(id);
	if (element) element.parentNode.removeChild(element);
}