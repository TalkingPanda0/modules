var oldtitle="";
var title = "";
var poll = "";

function temptitle(ttitle)
{
	oldtitle = $.getStatus($.channelName);
	$.updateStatus($.channelName, ttitle , "braincell",1);
	setTimeout(undotitle, 900000);
	$.say("Changed title to \"" + ttile + "\" for 15 minutes ");
}
function undotitle(){
	$.updateStatus($.channelName, oldtitle , "braincell",1);
	$.say("Changed title back to \"" + oldtitle + "\"");
	title = ""
	oldtitle = ""

}
function parsepoll(poll)
{
	// poll
	poll = ""
}
(function () {
	$.bind('command', function (event) {

		var sender = event.getSender(),
			command = event.getCommand(),
			args = event.getArgs();
		if(command.equalsIgnoreCase("approvetitle"))
			temptitle(title);
		else if(command.equalsIgnoreCase("approvepoll"))
			parsepoll(poll);
		else
			temptitle(args.join(" "));
	 
	});
	

	$.bind('PubSubChannelPoints', function (event) {
        var rewardTitle = event.getRewardTitle(),
            userInput = event.getUserInput(),
	    userName = event.getUsername();
	switch(rewardTitle)
	{
		case "Self Timeout":
			$.say("0");
			$.say("/timeout " + userName + " 300" + " Self Timeout");
			break;
		case "Timeout Somebody Else":
			$.say("1");
			$.say("/timeout " + userInput + " 300" + " Self Timeout");
			break;
		case "Poll":
			$.say("2");
			if(poll === "")
				poll = userInput;
			break;
		case "CHANGE TITLE FOR 15m":
			$.say("3");
			if(title === "")
				title = userInput;
			break;
		default:
			return
	}
       
	});
	/*	
	* @event initReady
	*/
	$.bind('initReady', function () {
		$.registerChatCommand('./custom/braincell.js', 'approvetitle', 2);
		$.registerChatCommand('./custom/braincell.js', 'approvepoll', 2);
		$.registerChatCommand('./custom/braincell.js', 'temptitle', 2);
	});

})();
