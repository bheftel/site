/* Written by Brannon Heftel
 *
 * jQuery
 * Copyright (c) 2012 jQuery Foundation and other contributors, http://jquery.org/
 *
 * jQuery LightBox plugin - by Leandro Vieira Pinho
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 */

 // works best on chrome, need to figure out ways to improve performance on firefox
window.onload = function()
{
	var loadingScreen = $("#loading_screen");
	
	loadingScreen.stop().animate({"opacity" : "0"}, 300, function()
			{				
				loadingScreen.remove();
			});

	// hold onto jquery objects to only have to make them once	
	var innerMain = $("#inner_main");
	var nameHeader = $("#name_container > div.header");
	var nameContainer = $("#name_container");
	nameContainer.big = true;
	var musicLink = $("#music_link");
	var musicMain = $("#music_main");
	var codeMain = $("#code_main");
	var codeLink = $("#code_link");
	var portfolioMain = $("#portfolio_main");
	var portfolioLink = $("#portfolio_link");
	var resumeMain = $("#resume_main");
	var resumeLink = $("#resume_link");
	var currentPage;
	var currentLink;

	// assign events	
	$("#code_link").click( function() { linkClick(codeMain, codeLink, this) });
	$("#music_link").click( function() { linkClick(musicMain, musicLink, this) });
	$("#portfolio_link").click( function() { linkClick(portfolioMain, portfolioLink, this) });
	$("#resume_link").click( function() { linkClick(resumeMain, resumeLink, this) });
	
	nameHeader.click(function(){ backClick(currentPage, currentLink) });

	$("#resume_a").lightBox({fixedNavigation: true});
	
	// functions for changing panes
	function changePane(oldPage, oldLink, toggle)
	{
		if (oldPage != undefined)
		{
			oldPage[0].style.left = "0px";

			oldPage.stop().animate({"left" : "-980px"}, 320, function()
			{				
				oldPage[0].style.left = "980px";
				oldPage[0].style.display = 'none';
			});
			
			if (toggle !== false)
				oldLink.slideToggle(300);
		}
	}
	
	function backClick(pageMain, pageLink)
	{
		if (pageMain != undefined)
		{
			pageMain[0].style.display = "block";
			nameContainer[0].style.cssFloat = "right";
			nameHeader[0].style.textAlign = "right";
			nameHeader[1].style.textAlign = "right";
			nameHeader.stop().animate({"font-size" : "168pt", "line-height" : "195px", "width" : "960px"}, 300, function()
			{
				nameHeader[0].style.cssFloat = "right";
				nameHeader[1].style.cssFloat = "right";
				nameContainer.big = true;
			});
			pageMain.stop().animate({"left" : "-980px"}, 300);
			changePane(currentPage, currentLink);
			currentPage = undefined;
			currentLink = undefined;
		}
	}

	function linkClick(pageMain, pageLink, instance)
	{
		pageMain[0].style.left = "980px";
		pageMain[0].style.display = "block";
		if (nameContainer.big)
		{
			nameContainer[0].style.cssFloat = "left";
			nameHeader[0].style.cssFloat = "left";
			nameHeader[1].style.cssFloat = "left";
			nameHeader[0].style.textAlign = "left";
			nameHeader[1].style.textAlign = "left";
			nameContainer.big = false;
		}
		changePane(currentPage, currentLink);
		nameHeader.stop().animate({"font-size" : "45pt", "line-height" : "65px", "width" : "265px"}, 320);
		pageMain.stop().animate({"left" : "0px"}, 300);
		
		var maxHeight = Math.max(pageMain[0].offsetHeight, 600);
		
		if (maxHeight != innerMain[0].offsetHeight)
			innerMain.stop().animate({ "height" : maxHeight }, 300);
		
		$(instance).slideToggle(400);
		currentPage = pageMain;
		currentLink = pageLink;
	}
	
	// initialize to the given pane
	switch (window.location.hash)
	{
		case '#music':
			musicLink[0].click();
			break;
		case '#code':
			codeLink[0].click();
			break;
		case '#portfolio':
			portfolioLink[0].click();
			break;
		case '#resume':
			resumeLink[0].click();
			break;
		default:
			break;
	}
}
