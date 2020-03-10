var prompts = [
{
	prompt: 'I find it difficult to introduce myself to people',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'I get so lost in my thoughts I ignore or forget my surroundings',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'I do not usually initiate conversations',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'I prefer not to engage with people who seem angry or upset',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'I choose my friends carefully',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'I find it difficult to tell stories about myself',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'I am usually highly motivated and energetic',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'I find it easy to walk up to a group of people and join in conversation',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'Being adaptable is more important than being organized',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'I care more about making sure no one gets upset than winning a debate',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'I often do not feel I have to justify myself to people',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'I would rather improvise than spend time coming up with a detailed plan',
	weight: 1,
	class: 'group11'
}

]

var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]


function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();


var total = 0;


function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}


$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	
	var classArr = classList.split(" ");
	
	var this_group = classArr[0];
	

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {
		document.getElementById('firstname').innerHTML;
		document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		console.log(document.getElementById('intro-bar').style.width);
		document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = '<b>You are introverted!</b><br><br>\
		someone who is shy, quiet, and prefers to spend time alone rather than often being with other people.\n\
<br><br>\
\
For introverts, to be alone with our thoughts is as restorative as sleeping, as nourishing as eating.\n\n\
<br><br>\
Introverted people are known for thinking things through before they speak, enjoying small, close groups of friends and one-on-one time. They get upset by unexpected changes or last-minute surprises.\
		';
	} else if(total > 0) {
		document.getElementById('firstname').innerHTML;
		document.getElementById('results').innerHTML = '<b>You are extroverted!</b><br><br>\
		On the opposite side of the coin, Extroverts enjoy social situations and even seek them out since they enjoy being around people. In school, you can expect an extroverted child to enjoy working on a team project or in a study group rather than alone.\
<br><br>\
\
\
When among people, thry make eye contact, smile, maybe chat if there’s an opportunity. As an extrovert, that’s a small ‘ping’ of energy, a little positive moment in the day.;'
	} else {
		document.getElementById('firstname').innerHTML;
		document.getElementById('results').innerHTML = '<b>You are ambiverted!</b><br><br>\
		Since introverts and extroverts are the extremes of the scale, the rest of us fall somewhere in the middle. Many of us lean one way or the other, but there are some who are quite balanced between the two tendencies. These people are called ambiverts.\
<br><br>\
Well let me explain a little bit more about ambiverts\
<br><br>\
Ambiverts exhibit both extroverted and introverted tendencies. This means that they generally enjoy being around people, but after a long time this will start to drain them. Similarly, they enjoy solitude and quiet, but not for too long. Ambiverts recharge their energy levels with a mixture of social interaction and alone time.'
	}

	
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-quiz').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-quiz').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-quiz').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})