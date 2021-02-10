function calculate(){
	let num1Ref, num2Ref, answerRef;

	let num1, num2, num3, answer;

	num1Ref = document.getElementById("number1");
	num2Ref = document.getElementById("number2");
	num3Ref = document.getElementById("number3");
	answerRef = document.getElementById("answer");

	num1 = Number(num1Ref.value);
	num2 = Number(num2Ref.value);
	num3 = Number(num3Ref.value);

	// TODO: Task 1 (Modify)
	//answer = num1 + num2 + num3;
	//Requires checking img is + or substract
	//if image1 is an addition, num1 and num2 is added to answer
	if (img1Src == "images/green addition op.png")
	{
		answer = num1 + num2;
	}
	//If not, num1 substracts num2 instead
	else if (img1Src == "images/green subtraction op.png")
	{
		answer = num1 - num2;
	}
	//Then, the same is repeated for img2
	if (img2Src == "images/green addition op.png")
	{
		//Answer is added to num3
		answer += num3;
	}
	//If not, answer is substracted with num3
	else if (img2Src == "images/green subtraction op.png")
	{
		answer -= num3;
	}

	//Accidentally deleted
	answerRef.innerHTML = answer;
	if (answer >= 0)
	{
		answerRef.className = "positive";
	}
	else
	{
		answerRef.className = "negative";
	}

	if ((answer % 2) === 0)
	{
		evenOdd.className = "even";
		evenOdd.innerHTML = " (even)"
	}
	else
	{
		evenOdd.className = "odd";
		evenOdd.innerHTML = " (odd)"
	}

}

// TODO: Task 1
//Extract imgFile ref
let img1Ref, img2Ref, img3Ref;
img1Ref = document.getElementById("img1");
img2Ref = document.getElementById("img2");

//Extract value of image from the img file
let img1Src, img2Src, img3Src;
img1Src = img1Ref.getAttribute("src");
img2Src = img1Ref.getAttribute("src");
console.log(img1Src == "images/green addition op.png");

//DOM addEventListener
img1Ref.addEventListener("click", change1);
img2Ref.addEventListener("click", change2);

/****************************************************************************/
/*
FUNCTION CODE DOCUMENT (ONLY FOR img1)
NO CALLS - img1Ref.addEventListener("click", change1)
--NO INPUT--
--OUTPUT--
CAUSES IMG TO CHANGE TO SUBSTRACT IF IT'S CURRENTLY Addition
--PSEUDOCODE--
1. Check if addition (img1Src === imageaddress)
2. IF TRUE: setAttribute(newImageAddress)
3. Else if not addition image: setAttribute(imageaddress)*/
function change1()
{
	if (img1Src == "images/green addition op.png")//images/green addition op.png
	{
		img1Ref.setAttribute("src", "images/green subtraction op.png");
	}
	else if (img1Src == "images/green subtraction op.png")
	{
		img1Ref.setAttribute("src", "images/green addition op.png");
	}
	img1Src = img1Ref.getAttribute("src");
}

/*
FUNCTION CODE DOCUMENT (ONLY FOR img2)
NO CALLS - img1Ref.addEventListener("click", change2)
--NO INPUT--
--OUTPUT--
CAUSES IMG TO CHANGE TO SUBSTRACT IF IT'S CURRENTLY Addition
--PSEUDOCODE--
1. Check if addition (img1Src === imageaddress)
2. IF TRUE: setAttribute(newImageAddress)
3. Else if not addition image: setAttribute(imageaddress)*/

function change2()
{
	if (img2Src === "images/green addition op.png")//images/green addition op.png
	{
		img2Ref.setAttribute("src", "images/green subtraction op.png");

	}
	else if (img2Src === "images/green subtraction op.png")
	{
		img2Ref.setAttribute("src", "images/green addition op.png");
	}
	img2Src = img2Ref.getAttribute("src");
}
