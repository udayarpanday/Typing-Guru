export default () => {

    const texts = [
        "hello my name is udaya raj panday and this is my fyp in this fyp i have made a typing platform for nepali language",
        "i have developed this paltform as a free online learning platfrom and hope to realease it soon in the market",
        "this application helps to imporve and learn the basics of nepali typing and understand the nepali keyboard"



    ];
    
    return texts[Math.floor(Math.random()*texts.length)];
  
  }