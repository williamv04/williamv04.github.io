boxList =[
box1El = document.getElementById("1"),
box2El = document.getElementById("2"),
box3El = document.getElementById("3"),
box4El = document.getElementById("4"),
box5El = document.getElementById("5"),
box6El = document.getElementById("6"),
box7El = document.getElementById("7"),
box8El = document.getElementById("8"),
box9El = document.getElementById("9"),
box10El = document.getElementById("10"),
box11El = document.getElementById("11"),
box12El = document.getElementById("12"),
box13El = document.getElementById("13"),
box14El = document.getElementById("14"),
box15El = document.getElementById("15"),
box16El = document.getElementById("16")
]

var n = 0
var l = 0
var c = 0
var s = 1
var a = 0
var Fucks = 0

h1El = document.querySelector("h1")

sadList = []

for (i in boxList){
    boxList[i].addEventListener("click", function(e){
        document.getElementById(e.target.id).style.backgroundImage = "url(" + (boxImgList[(e.target.id) - 1].src.substring(0).replace("%20", " ")) + ")"

        if (a){
            for (i in sadList){
                document.getElementById(sadList[i]).style.backgroundImage = ""
            }
            sadList = []
        }

        

        if(c){
            if (boxImgList[l - 1].id == boxImgList[(e.target.id) - 1].id){
                console.log("WOOOO!")
                sadList = []
                s = 0
            }
            else{
                s = 1
                Fucks = Fucks + 1
                console.log("sad.") 
                sadList.push(l)
                sadList.push(e.target.id)
                console.log(l, e.target.id)
                console.log(sadList)
                a = 1
            }


            c = 0
        }
        else {
            l = (e.target.id)
            c = 1
            
        }

        
        
        


        console.log(boxImgList[(e.target.id) - 1].id)
        n = boxImgList[(e.target.id) - 1].id

        h1El.innerHTML = "Fucks: " + Fucks

    })
}

imgList = [
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5"),
    document.getElementById("img6"),
    document.getElementById("img7"),
    document.getElementById("img8"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5"),
    document.getElementById("img6"),
    document.getElementById("img7"),
    document.getElementById("img8")
]

boxImgList = []

for (i in boxList){
    var x = Math.floor(Math.random()*(boxList.length - i))
    boxImgList.push(imgList[x])
    imgList.splice(x, 1)
}

