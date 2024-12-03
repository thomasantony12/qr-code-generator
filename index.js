/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs, { link } from "fs";

inquirer
  .prompt([
    {
      message: "Enter the link which you need to generate the qr image for:",
      name: "URL",
    },
  ])
  .then((answers) => {
    const webUrl = answers.URL;
    var qr_png = qr.image(webUrl, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qrImage.png"));

    fs.writeFile("URL.txt", webUrl, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log("something went wrong 1");
    }
  });

// var png_string = qr.imageSync(URL, { type: "png" });
