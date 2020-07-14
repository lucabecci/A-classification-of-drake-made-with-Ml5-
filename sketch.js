let mobileNet;
let duck;
let cnv;
preload = () => {
  duck = loadImage('./images/duck.jpg')
  console.log('imgload')
}
centerCanvas = () => {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup (){
  //Canvas configuration
  cnv = createCanvas(400,400);
  centerCanvas()
  background(0)

  //Mobile net and image configuration
  image(duck, 0, 0, width, height)
  mobileNet = ml5.imageClassifier('MobileNet', () => {
    mobileNet.predict(duck, async(err ,res) => {
      if(err){
        await console.log(err);
      }else{
        let data = await res;
        let classification = createP(`This is a: ${ data[0].label }`);
        let probability = createP(`Probability: ${ data[0].confidence }%`)
        console.log(data)
      }
    })
  });
}

function windowResized() {
  centerCanvas();
}